import styles from "../styles/ChatsSidebar.module.css";

function ChatsSidebar() {

    const chats = [
        { id: 1, name: "Rahul", last: "Hey there!", time: "10:30 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
        { id: 2, name: "Aman", last: "How are you?", time: "09:10 AM" },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Messages</h2>
            </div>
            <div className={styles.sidebarChats}>
                {chats.map(chat => (
                    <div key={chat.id} className={styles.chatItem}>
                        <div className={styles.avatar}>
                            <img src="/images/41.png" alt="" />
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