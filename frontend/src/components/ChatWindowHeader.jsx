import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styles from "../styles/ChatWindowHeader.module.css";
import DefaultProfile from "./DefaultProfile";
import { useOutletContext } from "react-router";

function ChatWindowHeader() {

    const { visible } = useOutletContext();
    const { chatUser } = useContext(ChatContext);

    return (
        <div className={styles.chatHeader}>
            {visible && <div className="visibleDiv"></div>}
            <div className={styles.avatar}>
                <DefaultProfile/>
            </div>
            <div className={styles.chatHeaderText}>
                <h4>{chatUser.name}</h4>
            </div>
        </div>

    )
}

export default ChatWindowHeader