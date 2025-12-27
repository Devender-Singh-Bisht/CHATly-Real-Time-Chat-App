import { useContext, useState } from "react";
import styles from "../styles/ChatsWindow.module.css";
import { ChatContext } from "../contexts/ChatContext";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowMessages from "./ChatWindowMessages";
import ChatWindowInput from "./ChatWindowInput";

function ChatsWindow() {

    const { chatUser } = useContext(ChatContext);
    const [messages, setMessages] = useState({});

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