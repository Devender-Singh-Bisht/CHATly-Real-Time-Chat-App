import ChatsNavbar from "../components/ChatsNavbar";
import ChatsSidebar from "../components/ChatsSidebar";
import ChatsWindow from "../components/ChatsWindow";
import styles from "../styles/Chats.module.css";

export default function Chats() {

  return (
    <div className={styles.page}>
      <ChatsNavbar />
      <div className={styles.container}>
        <ChatsSidebar />
        <ChatsWindow />
      </div>
    </div>
  );
}
