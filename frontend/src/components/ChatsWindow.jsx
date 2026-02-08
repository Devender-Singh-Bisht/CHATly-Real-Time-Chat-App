import { useContext, useState } from "react";
import styles from "../styles/ChatsWindow.module.css";
import { ChatContext } from "../contexts/ChatContext";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowMessages from "./ChatWindowMessages";
import ChatWindowInput from "./ChatWindowInput";
import { useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { AuthContext } from "../contexts/AuthContext";

function ChatsWindow() {

    const { user } = useContext(AuthContext);
    const { chatUser } = useContext(ChatContext);
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        socket?.on("new_message", (message) => {
            const senderId = message["sender_id"];
            if (!(senderId in messages)) {
                const newMessage = { id: message["message_id"], text: message["content"], self: message["sender_id"] == user.user_id };

                setMessages(prev => ({
                    ...prev,
                    [senderId]: [...(prev[senderId] || []), newMessage],
                }));
            }
        })

        return () => {
            socket.off("new_message");
        }
    }, [socket])

    if (chatUser === null) {
        return (
            <section className={styles.chatWindow}>
                <div className={styles.initialWindow}>
                    <div className={styles.tooltip}><h1>Chatly</h1></div>
                    <p>Chat your way</p>
                </div>
            </section>
        )
    };

    return (
        <section className={styles.chatWindow}>
            {/* Header */}
            <ChatWindowHeader />

            {/* Messages */}
            <ChatWindowMessages messages={messages} setMessages={setMessages} />

            {/* Emoji Picker and Input  */}
            <ChatWindowInput setMessages={setMessages} />
        </section>
    )
}

export default ChatsWindow