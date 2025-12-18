import styles from "../styles/Chats.module.css";
import ChatsNavbar from "../components/ChatsNavbar";
import ChatsSidebar from "../components/ChatsSidebar";
import ChatsWindow from "../components/ChatsWindow";

export default function ChatsPage() {

    return (
        <div className={styles.page}>

            <ChatsNavbar />

            <div className={styles.chatArea}>

                <ChatsSidebar/>
                <ChatsWindow/>

            </div>
        </div>
    );
}
