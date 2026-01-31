import styles from "../styles/FriendShip.module.css";
import Spinner from "./Spinner";
import UserItem from "./UserItem";

const FriendsListSection = ({ friends, isLoading }) => {
  return (
    <section className={styles.friendsCont}>
      <div>Your Friends</div>
      <div className={styles.friends}>
        {isLoading ? (
          <div className={styles.loader}><Spinner /></div>
        ) : (
          friends?.map((friend) => (
            <UserItem key={friend.user_id} user={friend}>
              <button className={styles.messageBtn}>Message</button>
            </UserItem>
          ))
        )}
      </div>
    </section>
  );
};

export default FriendsListSection;