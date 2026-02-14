import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../styles/FriendShip.module.css";

import ChatsNavbar from "../components/ChatsNavbar";
import useGetData from "../hooks/useGetData";

import UserSearchSection from "../components/UserSearchSection";
import FriendsListSection from "../components/FriendsListSection";
import FriendRequestsSection from "../components/FriendRequestsSection";
import { SocketContext } from "../contexts/SocketContext";

function FriendShip() {

    const socket = useContext(SocketContext);

    const [searchResults, setSearchResults] = useState(null);
    const [friends, setFriends] = useState(null);
    const [requests, setRequests] = useState(null);

    const URL = import.meta.env.VITE_API_URL;
    const requestsUrl = `${URL}/api/user/friend-requests`;
    const friendsUrl = `${URL}/api/user/friends`;

    const [friendsData, friendsError, isFriendsLoading] = useGetData(friendsUrl, {}, false, []);
    const [requestsData, requestsError, isRequestsLoading] = useGetData(requestsUrl, {}, false, []);

    useEffect(() => {
        if (friendsData?.data) setFriends(friendsData.data);
        if (requestsData?.data) setRequests(requestsData.data);
    }, [friendsData, requestsData]);

    useEffect(() => {
        if (friendsError) toast.error(friendsError);
        if (requestsError) toast.error(requestsError);
    }, [friendsError, requestsError]);

    useEffect(() => {
        socket?.on("new_request", (request) => {
            toast(`Friend Request from ${request.username}`, {icon: "🔥"});
            setRequests(prev => ([request, ...prev]));
        })

        return () => {
            socket.off("new_request");
        }
    }, [socket])

    return (
        <div className={styles.page}>
            <ChatsNavbar activeNav="friends" />
            <div className={styles.main}>
                <div className={styles.container}>

                    <UserSearchSection
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                    />

                    <FriendsListSection
                        friends={friends}
                        isLoading={isFriendsLoading}
                    />

                    <FriendRequestsSection
                        requests={requests}
                        isLoading={isRequestsLoading}
                    />

                </div>
            </div>
        </div>
    );
}

export default FriendShip;