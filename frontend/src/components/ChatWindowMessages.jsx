import { useContext, useRef, useEffect } from "react";
import styles from "../styles/ChatWindowMessages.module.css";
import useGetData from "../hooks/useGetData";
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from "../contexts/ChatContext";


function ChatWindowMessages({messages, setMessages}) {

    const scrollRef = useRef(null);
    const { user } = useContext(AuthContext);
    const {chatUser} = useContext(ChatContext)

    const URL = import.meta.env.VITE_API_URL;
    let messageUrl;
    if (chatUser !== null) messageUrl = `${URL}/api/user/conversations/${chatUser.id}/messages`;

    const [data, error, isLoading] = useGetData(messageUrl, {}, false, [chatUser])

    useEffect(() => {
        if (data && data["data"]) {
            const newMessages = data["data"].map((message) => {
                const isSelf = (message["sender_id"] == user.user_id);
                return {
                    id: message["message_id"],
                    text: message["content"],
                    self: isSelf
                };
            });

            setMessages(newMessages);
        }
    }, [data]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [messages]);

    return (
        <div className={styles.messages}>
            {messages.map(msg => (
                <div
                    key={msg.id}
                    className={`${styles.message} ${msg.self ? styles.self : ""
                        }`}
                >
                    {msg.text}
                </div>
            ))}

            <div ref={scrollRef} />
        </div>
    )
}

export default ChatWindowMessages