import styles from "../styles/Chats.module.css";

function ChatsNavbar() {
    return (
        <nav className={styles.topNav}>
            <h3>Chatly</h3>
            <div className={styles.navLinks}>
                <span className={styles.active}>Chats</span>
                <span>Friends</span>
            </div>
        </nav>
    )
}

export default ChatsNavbar