import { useContext } from "react";
import useGetData from "../hooks/useGetData";
import styles from "../styles/ChatsSidebar.module.css";
import { getLocal24HourTime } from "../utils/time.utils";
import { ChatContext } from "../contexts/ChatContext";


function ChatsSidebar() {

    const {handleChatUser} = useContext(ChatContext)

    const URL = import.meta.env.VITE_API_URL;
    const convoUrl = `${URL}/api/user/conversations`;
    const [data, error, isLoading] = useGetData(convoUrl);

    let chats = [
        { key: 1, name: "", last: "", time: "" },
        { key: 2, name: "", last: "", time: "" },
        { key: 3, name: "", last: "", time: "" }
    ];

    if (data) {
        chats = data["data"]?.map((user) => {
            return {
                id: user["other_user_id"],
                name: user["first_name"] + " " + user["last_name"],
                last: user["content"],
                time: getLocal24HourTime(user["sent_at"]),
                profilePic: user["profile_pic_url"]
            };
        });
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Messages</h2>
            </div>
            <div className={styles.sidebarChats}>
                {chats.map(chat => (
                    <div key={chat.id} className={styles.chatItem} onClick={() => handleChatUser(chat.id, chat.name, chat.profilePic)}>
                        <div className={styles.avatar}>
                            {/* <img src={chat.profilePic} alt="Profile image" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
                        </div>
                        <div className={styles.chatInfo}>
                            <h4>{chat.name}</h4>
                            <p>{chat.last}</p>
                        </div>
                        <span className={styles.time}>{chat.time}</span>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default ChatsSidebar