import { useContext, useRef, useEffect, useState } from "react";
import styles from "../styles/ChatWindowMessages.module.css";
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from "../contexts/ChatContext";
import { getMessages } from "../utils/getMessages.utils";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useOutletContext } from "react-router";


function ChatWindowMessages({ messages, setMessages }) {
    const scrollRef = useRef(null);
    const { user } = useContext(AuthContext);
    const { chatUser } = useContext(ChatContext);
    const [isloading, setIsLoading] = useState(false);
    const [isPaginating, setIsPaginating] = useState(false);
    const { visible } = useOutletContext();

    const [nextCursor, setNextCursor] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const topLoader = useRef(null);
    const msgContRef = useRef(null);

    async function getChatMessages() {
        if (!chatUser?.id) return;
        try {
            setIsLoading(true);
            const { chatMessages, nextCursor, hasMore } = await getMessages(chatUser.id);

            const newMessages = chatMessages.map((m) => ({
                id: m.message_id,
                text: m.content,
                self: m.sender_id == user.user_id
            }));

            setMessages(prev => ({ ...prev, [chatUser.id]: newMessages }));
            setNextCursor(nextCursor);
            setHasMore(hasMore);
        } catch (error) {
            toast.error("Failed to fetch messages.");
        } finally {
            setIsLoading(false);
        }
    }

    async function loadMore() {
        if (!hasMore || isPaginating) return;

        const container = msgContRef.current;
        const previousHeight = container.scrollHeight;
        setIsPaginating(true); 

        try {
            const { chatMessages, nextCursor: newCursor, hasMore: more } = await getMessages(chatUser.id, { cursor: nextCursor });
            
            const newMessages = chatMessages.map((m) => ({
                id: m.message_id,
                text: m.content,
                self: m.sender_id == user.user_id
            }));

            setMessages(prev => ({ 
                ...prev, 
                [chatUser.id]: [...newMessages, ...(prev[chatUser.id] || [])] 
            }));
            
            setHasMore(more);
            setNextCursor(newCursor);

            requestAnimationFrame(() => {
                container.scrollTop = container.scrollHeight - previousHeight;
                setIsPaginating(false);
            });
        } catch (error) {
            setIsPaginating(false);
            toast.error("Unable to load older messages.");
        }
    }

    useEffect(() => {
        getChatMessages();
    }, [chatUser?.id]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !isPaginating) {
                loadMore();
            }
        }, { threshold: 0.1 });

        if (topLoader.current) observer.observe(topLoader.current);
        return () => observer.disconnect();
    }, [nextCursor, hasMore, isPaginating]);

    useEffect(() => {
        if (scrollRef.current && !isPaginating) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [messages]);

    if (isloading) { 
        return <section className={styles.messages}><Spinner /></section>;
    }

    return (
        <div className={styles.messages} ref={msgContRef}>
            <div ref={topLoader} style={{ height: '10px' }}>
                {hasMore && <Spinner />}
            </div>

            {messages[chatUser?.id]?.map(msg => (
                <div key={msg.id} className={`${styles.message} ${msg.self ? styles.self : ""}`}>
                    {(visible) && <div className="visibleDiv"></div>}
                    {msg.text}
                </div>
            ))}
            <div ref={scrollRef} />
        </div>
    );
}

export default ChatWindowMessages