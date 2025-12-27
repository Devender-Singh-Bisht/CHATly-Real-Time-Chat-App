import { useContext, useRef, useEffect } from "react";
import styles from "../styles/ChatWindowMessages.module.css";
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from "../contexts/ChatContext";
import { getMessages } from "../utils/getMessages.utils";
import toast from "react-hot-toast";


function ChatWindowMessages({ messages, setMessages }) {

    const scrollRef = useRef(null);
    const { user } = useContext(AuthContext);
    const { chatUser } = useContext(ChatContext)

    async function getChatMessages() {
        if (chatUser?.id && !(chatUser.id in messages)) {
            try {
                const { chatMessages, nextCursor, hasMore } = await getMessages(chatUser.id);

                console.log(chatMessages);

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
            }
        }
    }

    useEffect(() => {
        getChatMessages();

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [chatUser])

    return (
        <div className={styles.messages}>
            {messages[chatUser?.id]?.map(msg => (
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