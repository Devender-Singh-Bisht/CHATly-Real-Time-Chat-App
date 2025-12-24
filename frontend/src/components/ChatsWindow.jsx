import { useContext, useState } from "react";
import styles from "../styles/ChatsWindow.module.css";
import EmojiPicker from "emoji-picker-react";
import { ChatContext } from "../contexts/ChatContext";
import useGetData from "../hooks/useGetData";
import { AuthContext } from '../contexts/AuthContext';

function ChatsWindow() {

    const { chatUser } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    const [input, setInput] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const URL = import.meta.env.VITE_API_URL;
    let messageUrl;
    if (chatUser !== null) messageUrl = `${URL}/api/user/conversations/${chatUser.id}/messages`;

    const [data, error, isLoading] = useGetData(messageUrl, {}, false, [chatUser])

    let messages = []
    if (data) {
        messages = data["data"]?.map((message) => {
            const isSelf = (message["sender_id"] == user.user_id)

            return {
                id: message["message_id"],
                text: message["content"],
                self: isSelf
            };
        });
    }

    const handleInputChange = (e) => setInput(prev => e.target.value);
    const handleEmojiClick = (emojiObject) => setInput(prev => prev + emojiObject.emoji);
    const handleEmojiPicker = (e) => setShowPicker(prev => !prev);


    if (chatUser === null) {
        return (
            <section className={styles.chatWindow}>
                <div className={styles.initialWindow}>
                    <h1>Chatly</h1>
                </div>
            </section>
        )
    };

    return (
        <section className={styles.chatWindow}>
            {/* Header */}
            <div className={styles.chatHeader}>
                <div className={styles.avatar}>
                    <img src="/images/41.png" alt="" />
                </div>
                <div className={styles.chatHeaderText}>
                    <h4>{chatUser.name}</h4>
                    <span className={styles.status}>online</span>
                </div>
            </div>

            {/* Messages */}
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
            </div>

            {/* Emoji Picker */}
            {(showPicker &&
                <div className={styles.emojiPickerContainer}>
                    <EmojiPicker height={300} emojiStyle="google" onEmojiClick={handleEmojiClick} />
                </div>)}

            {/* Input */}
            <div className={styles.inputBox} >
                <div className={styles.emojiToggleContainer} onClick={handleEmojiPicker} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M800-680v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q43 0 83 8.5t77 24.5v167h80v80h142q9 29 13.5 58.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
                </div>
                <input placeholder="Type a message" value={input} onChange={handleInputChange} />
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" /></svg>
                </button>
            </div>
        </section>
    )
}

export default ChatsWindow