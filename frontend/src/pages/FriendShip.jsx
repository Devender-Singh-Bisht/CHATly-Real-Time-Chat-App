import styles from "../styles/FriendShip.module.css";
import ChatsNavbar from "../components/ChatsNavbar";
import DefaultProfile from "../components/DefaultProfile.jsx"
import Spinner from "../components/Spinner";
import useGetData from "../hooks/useGetData";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

function FriendShip() {

    const [searchResults, setSearchResults] = useState(null);

    const URL = import.meta.env.VITE_API_URL;
    const friendRequestsUrl = `${URL}/api/user/freind-requests`;
    const friendsUrl = `${URL}/api/user/freinds`;
    const recommendedUrl = `${URL}/api/user/recommended`;

    const friends = [
        { name: "Devender Singh Bisht", userId: "devender123" },
        { name: "Devender Singh Bisht", userId: "devender123" },
        { name: "Devender Singh Bisht", userId: "devender123" },
        { name: "Devender Singh Bisht", userId: "devender123" },
        // { name: "Devender Singh Bisht", userId: "devender123" },
    ]

    return (
        <div className={styles.page}>
            <ChatsNavbar />
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.searchUsers}>
                        <SearchBar placeholder="Search user..." />
                        <div className={styles.results}>
                            {searchResults ? (
                                <div className={styles.result}></div>
                            ) : (
                                <div className={styles.noResults}>No Results!!</div>
                            )}
                        </div>
                    </div>
                    <div className={styles.friendsCont}>
                        <div>Your Friends</div>
                        <div className={styles.friends}>
                            {
                                friends.map((friend) => {
                                    return (
                                        <div className={styles.friend}>
                                            <div className={styles.avatar}>
                                                <DefaultProfile fill="black" />
                                            </div>
                                            <div className={styles.friendDetail}>
                                                <h3>{friend.name}</h3>
                                                <p>{friend.userId}</p>
                                            </div>
                                            <button className={styles.messageBtn}>Message</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendShip;