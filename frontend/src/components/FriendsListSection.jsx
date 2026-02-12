import { useNavigate, useOutletContext } from "react-router";
import styles from "../styles/FriendShip.module.css";
import Spinner from "./Spinner";
import UserItem from "./UserItem";
import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

const FriendsListSection = ({ friends, isLoading }) => {

  const { conversations, setConversations } = useOutletContext()
  const navigate = useNavigate();
  const { handleChatUser } = useContext(ChatContext);

  const handleMessageClick = (user) => {
    const name = `${user["first_name"]} ${user["last_name"]}`;
    const userExists = conversations.some(conversation => conversation.id === user.user_id);
    if (!userExists) {
      const newConversation = { id: user.user_id, name: name } 
      setConversations(prev => [newConversation, ...prev]);
    }

    handleChatUser(user.user_id, name, user["profile_pic_url"])
    navigate("/chats", { replace: true });
  }

  return (
    <section className={styles.friendsCont}>
      <div>Your Friends</div>
      <div className={styles.friends}>
        {isLoading ? (
          <div className={styles.loader}><Spinner /></div>
        ) : (
          friends?.map((friend) => (
            <UserItem key={friend.user_id} user={friend}>
              <button className={styles.messageBtn} onClick={() => handleMessageClick(friend)} >Message</button>
            </UserItem>
          ))
        )}
      </div>
    </section>
  );
};

export default FriendsListSection;