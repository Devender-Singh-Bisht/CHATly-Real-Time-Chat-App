import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styles from "../styles/ChatWindowHeader.module.css";
import DefaultProfile from "./DefaultProfile";

function ChatWindowHeader() {

    const { chatUser } = useContext(ChatContext);

    return (
        <div className={styles.chatHeader}>
            <div className={styles.avatar}>
                <DefaultProfile/>
            </div>
            <div className={styles.chatHeaderText}>
                <h4>{chatUser.name}</h4>
                <span className={styles.status}>online</span>
            </div>
        </div>

    )
}

export default ChatWindowHeader