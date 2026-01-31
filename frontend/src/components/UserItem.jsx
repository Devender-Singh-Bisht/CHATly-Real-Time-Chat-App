import styles from "../styles/FriendShip.module.css";
import DefaultProfile from "./DefaultProfile";

const UserItem = ({ user, children }) => {
  return (
    <div className={styles.friend}>
      <div className={styles.avatar}>
        <DefaultProfile fill="black" />
      </div>
      <div className={styles.friendDetail}>
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <p>{user.username}</p>
      </div>
      {children}
    </div>
  );
};

export default UserItem;