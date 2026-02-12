import { useNavigate, useOutletContext } from "react-router";
import styles from "../styles/FriendShip.module.css";
import SearchBar from "./SearchBar";
import UserItem from "./UserItem";
import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

const UserSearchSection = ({ searchResults, setSearchResults }) => {

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
    <section className={styles.searchUsers}>
      <SearchBar placeholder="Search Username..." setSearchResults={setSearchResults} />
      <div className={styles.results}>
        {searchResults ? (
          searchResults.length === 0 ? (
            <div className={styles.noResults}>No Results!!</div>
          ) : (
            searchResults.map((user) => (
              <UserItem key={user.user_id} user={user}>
                {user.isFriend ? (
                  <button className={styles.messageBtn} onClick={() => handleMessageClick(user)} >Message</button>
                ) : (
                  <button className={styles.addBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                      <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" />
                    </svg>
                  </button>
                )}
              </UserItem>
            ))
          )
        ) : (
          <div className={styles.noResults}>Search Username...</div>
        )}
      </div>
    </section>
  );
};

export default UserSearchSection;