import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styles from "../styles/ChatWindowHeader.module.css";
import DefaultProfile from "./DefaultProfile";
import { useOutletContext } from "react-router";

function ChatWindowHeader() {

    const { visible } = useOutletContext();
    const { chatUser, setChatUser } = useContext(ChatContext);

    const handleBackClick = () => {
        setChatUser(null);
    }

    return (
        <div className={styles.chatHeader}>

            <button onClick={handleBackClick} className={styles.backBtn}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2a7b9b"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg></button>
            <div className={styles.info}>
                {visible && <div className="visibleDiv"></div>}
                <div className={styles.avatar}>
                    <DefaultProfile />
                </div>
                <div className={styles.chatHeaderText}>
                    <h4>{chatUser.name}</h4>
                </div>
            </div>
        </div>

    )
}

export default ChatWindowHeader