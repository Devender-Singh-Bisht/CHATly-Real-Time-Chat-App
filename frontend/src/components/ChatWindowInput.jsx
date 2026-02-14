import { useState, useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import EmojiPicker from "emoji-picker-react";
import styles from "../styles/ChatWindowInput.module.css";
import toast from "react-hot-toast"
import { sendMessage } from "../utils/sendMessage.utils";
import { AuthContext } from "../contexts/AuthContext";
import { useOutletContext } from "react-router";
import { getLocal24HourTime } from "../utils/time.utils";

function ChatWindowInput({ setMessages }) {

    const { chatUser } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const [input, setInput] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const { setConversations } = useOutletContext();

    const handleInputChange = (e) => setInput(prev => e.target.value);
    const handleEmojiClick = (emojiObject) => setInput(prev => prev + emojiObject.emoji);
    const handleEmojiPicker = (e) => setShowPicker(prev => !prev);

    const handleInputSubmit = async () => {
        const messageText = input.trim();
        if (messageText.length < 1) return;
        if (messageText.length > 4000) {
            toast.error("Message length exceeds the limit. Max 4000 characters are allowed.");
            return;
        }

        const tempId = crypto.randomUUID();
        const tempMessage = {
            id: tempId,
            temp: true,
            text: messageText,
            self: true
        };

        const currentChatUser = chatUser;
        const currentChatId = chatUser.id;

        setInput("");
        setMessages(prev => ({
            ...prev,
            [currentChatId]: [...(prev[currentChatId] || []), tempMessage]
        }));

        try {
            const response = await sendMessage(currentChatId, messageText);

            const confirmedMessage = {
                id: response[0].message_id,
                text: response[0].content,
                self: response[0].sender_id === user.user_id
            };

            setMessages(prev => ({
                ...prev,
                [currentChatId]: prev[currentChatId].map(msg =>
                    msg.id === tempId ? confirmedMessage : msg
                )
            }));

            setConversations(prev => {
                const time = getLocal24HourTime(response[0]["sent_at"])
                let conversation = {id: currentChatId, name: currentChatUser.name, last: response[0].content, time: time};
                const newConversations = prev.filter(user => user.id != currentChatId);
                return [conversation, ...newConversations];
            })

        } catch (error) {
            toast.error(error.message || "Failed to send message");
            setMessages(prev => ({
                ...prev,
                [currentChatId]: prev[currentChatId].filter(msg => msg.id !== tempId)
            }));
        }
    };


    return (
        <>
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
                <input placeholder="Type a message" value={input} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === 'Enter') { handleInputSubmit(); } }} />
                <button onClick={handleInputSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" /></svg>
                </button>
            </div>
        </>
    )
}

export default ChatWindowInput