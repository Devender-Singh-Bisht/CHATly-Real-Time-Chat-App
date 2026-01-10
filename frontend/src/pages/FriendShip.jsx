import styles from "../styles/FriendShip.module.css";
import ChatsNavbar from "../components/ChatsNavbar";
import DefaultProfile from "../components/DefaultProfile.jsx"
import Spinner from "../components/Spinner";
import useGetData from "../hooks/useGetData";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function FriendShip() {

    const [searchResults, setSearchResults] = useState(null);
    const [friends, setFriends] = useState(null);
    const [requests, setRequests] = useState(null);

    const URL = import.meta.env.VITE_API_URL;
    const requestsUrl = `${URL}/api/user/freind-requests`;
    const friendsUrl = `${URL}/api/user/friends`;

    const [friendsData, friendsError, isFriendsLoading] = useGetData(friendsUrl, {}, false, []);
    const [requestsData, requestsError, isRequestsLoading] = useGetData(requestsUrl, {}, false, []);

    useEffect(() => {
        setFriends(friendsData?.data);
        setRequests(requestsData?.data);
    }, [friendsData, requestsData])

    if (friendsError) toast.error(friendsError);
    if (requestsError) toast.error(requestsError);

    return (
        <div className={styles.page}>
            <ChatsNavbar activeNav="friends" />
            <div className={styles.main}>
                <div className={styles.container}>

                    <section className={styles.searchUsers}>
                        <SearchBar placeholder="Search Username..." setSearchResults={setSearchResults} />
                        <div className={styles.results}>
                            {searchResults ? (
                                searchResults.length === 0 ? (
                                    <div className={styles.noResults}>No Results!!</div>
                                ) : (
                                    searchResults?.map((user) => {
                                        return (
                                            <div key={user.user_id} className={styles.friend}>
                                                <div className={styles.avatar}>
                                                    <DefaultProfile fill="black" />
                                                </div>
                                                <div className={styles.friendDetail}>
                                                    <h3>{user.first_name + " " + user.last_name}</h3>
                                                    <p>{user.username}</p>
                                                </div>
                                                {user.isFriend ? (
                                                    <button className={styles.messageBtn}>Message</button>

                                                ) : (
                                                    <button className={styles.addBtn}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg></button>
                                                )}
                                            </div>
                                        )
                                    })
                                )
                            ) : (
                                <div className={styles.noResults}>Search Username...</div>
                            )}
                        </div>
                    </section>

                    <section className={styles.friendsCont}>
                        <div>Your Friends</div>
                        <div className={styles.friends}>
                            {
                                isFriendsLoading ? (
                                    <div className={styles.loader}>
                                        <Spinner />
                                    </div>
                                ) : (
                                    friends?.map((friend) => {
                                        return (
                                            <div key={friend.user_id} className={styles.friend}>
                                                <div className={styles.avatar}>
                                                    <DefaultProfile fill="black" />
                                                </div>
                                                <div className={styles.friendDetail}>
                                                    <h3>{friend.first_name + " " + friend.last_name}</h3>
                                                    <p>{friend.username}</p>
                                                </div>
                                                <button className={styles.messageBtn}>Message</button>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                    </section>

                    <section className={styles.requestsCont}>
                        <div>Friend Requests</div>
                        <div className={styles.requests}>
                            {
                                isRequestsLoading ? (
                                    <div className={styles.loader}>
                                        <Spinner />
                                    </div>
                                ) : (
                                    requests?.map((request) => {
                                        return (
                                            <div key={request.user_id} className={styles.friend}>
                                                <div className={styles.avatar}>
                                                    <DefaultProfile fill="black" />
                                                </div>
                                                <div className={styles.friendDetail}>
                                                    <h3>{request.first_name + " " + request.last_name}</h3>
                                                    <p>{request.username}</p>
                                                </div>
                                                <div className={styles.buttons}>
                                                    <button className={styles.addBtn}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg></button>
                                                    <button className={styles.deleteBtn}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" /></svg></button>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default FriendShip;