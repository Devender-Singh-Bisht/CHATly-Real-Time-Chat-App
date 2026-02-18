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
    const { visible } = useOutletContext();


    async function getChatMessages() {
        if (chatUser?.id) {
            try {
                setIsLoading(true);
                const { chatMessages, nextCursor, hasMore } = await getMessages(chatUser.id);

                const newMessages = chatMessages.map((message) => {
                    return {
                        id: message["message_id"],
                        text: message["content"],
                        self: message["sender_id"] == user.user_id
                    };
                });

                setMessages(prev => ({ ...prev, [chatUser.id]: newMessages }));
            } catch (error) {
                toast.error(error || "Failed to fetch messages.")
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        getChatMessages();
    }, [chatUser])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [chatUser, messages])

    if (isloading) {
        return (
            <section className={styles.messages}>
                <Spinner />
            </section>
        )
    }

    return (
        <div className={styles.messages}>
            {messages[chatUser?.id]?.map(msg => (
                <div
                    key={msg.id}
                    className={`${styles.message} ${msg.self ? styles.self : ""
                        }`}
                >
                    {visible && <div className="visibleDiv"></div>}
                    {msg.text}
                </div>
            ))}
            
            <div ref={scrollRef} />
        </div>
    )
}

export default ChatWindowMessages