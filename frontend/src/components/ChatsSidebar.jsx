import { useContext, useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import styles from "../styles/ChatsSidebar.module.css";
import { getLocal24HourTime } from "../utils/time.utils";
import { ChatContext } from "../contexts/ChatContext";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import DefaultProfile from "./DefaultProfile";
import { useOutletContext } from "react-router";

function ChatsSidebar() {
    const { handleChatUser } = useContext(ChatContext);
    const URL = import.meta.env.VITE_API_URL;
    const convoUrl = `${URL}/api/user/conversations`;
    const [data, error, isLoading] = useGetData(convoUrl);
    const {conversations, setConversations, visible} = useOutletContext();

    useEffect(() => {
        if (data?.data) {
            const chats = data["data"].map((user) => ({
                id: user["other_user_id"],
                name: `${user["first_name"]} ${user["last_name"]}`,
                last: user["content"],
                time: getLocal24HourTime(user["sent_at"]),
                profilePic: user["profile_pic_url"]
            }));
            setConversations(chats);
        }
    }, [data]);

    if (error) toast.error(error);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Messages</h2>
            </div>
            <div className={styles.sidebarChats}>
                {isLoading ? (
                    <Spinner />
                ) : conversations.length === 0 ? (
                    <div className={styles.noConversations}>
                        <h3>No Conversations Yet!!</h3>
                    </div>
                ) : (
                    conversations.map((chat) => (
                        <div 
                            key={chat.id} 
                            className={styles.chatItem} 
                            onClick={() => handleChatUser(chat.id, chat.name, chat.profilePic)}
                        >
                            {(visible) && <div className="visibleDiv"></div>}
                            <div className={styles.avatar}>
                                <DefaultProfile />
                            </div>
                            <div className={styles.chatInfo}>
                                <h4>{chat.name}</h4>
                                {chat.last && (<p className={styles.lastMessage}>{chat.last}</p>)}
                            </div>
                            <span className={styles.time}>{chat.time}</span>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}

export default ChatsSidebar;