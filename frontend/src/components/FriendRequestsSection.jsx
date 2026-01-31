import styles from "../styles/FriendShip.module.css";
import Spinner from "./Spinner";
import UserItem from "./UserItem";

const FriendRequestsSection = ({ requests, isLoading }) => {
  return (
    <section className={styles.requestsCont}>
      <div>Friend Requests</div>
      <div className={styles.requests}>
        {isLoading ? (
          <div className={styles.loader}><Spinner /></div>
        ) : (
          requests?.map((request) => (
            <UserItem key={request.user_id} user={request}>
              <div className={styles.buttons}>
                <button className={styles.addBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" />
                    </svg>
                </button>
                <button className={styles.deleteBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                    </svg>
                </button>
              </div>
            </UserItem>
          ))
        )}
      </div>
    </section>
  );
};

export default FriendRequestsSection;