import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import ChatsNavbar from "../components/ChatsNavbar"
import styles from "../styles/Profile.module.css"
import DefaultProfile from "../components/DefaultProfile"
import useGetData from "../hooks/useGetData"
import Spinner from "../components/Spinner"
import { AuthContext } from "../contexts/AuthContext"
import { getMonthYear } from "../utils/time.utils"
import toast from "react-hot-toast"

function Profile() {

    const { username } = useParams();
    const { user } = useContext(AuthContext);

    const URL = import.meta.env.VITE_API_URL;
    let usersUrl;
    if (username === user?.username) {
        usersUrl = `${URL}/api/user/profile`;
    }
    else {
        usersUrl = `${URL}/api/user/${username}`;
    }

    const [userData, userError, isUserLoading] = useGetData(usersUrl, {}, false, [user]);

    if (!userData) return null;

    if (userError) {
        toast.error(userError);
    }

    if (isUserLoading) {
        return (
            <div className={styles.page}>
                <ChatsNavbar activeNav="profile" />
                <div className={styles.profileArea}>
                    <Spinner />
                </div>
            </div>
        )
    };

    const profile = userData.data[0];

    return (
        <div className={styles.page}>
            <ChatsNavbar activeNav="profile" />
            <div className={styles.profileArea}>
                <div className={styles.profileCont}>
                    <div className={styles.top}>
                        <div className={styles.avatar}>
                            <DefaultProfile fill="var(--darkBlue)" />
                        </div>
                        <div className={styles.topRight}>
                            <h1 className={styles.fullName}>{profile?.first_name + " " + profile?.last_name}</h1>
                            <h3 className={styles.userName}>{profile?.username}</h3>
                            <h4 className={styles.bio}>{profile?.bio}</h4>
                        </div>
                    </div>
                    <div className={styles.detailsCont}>
                        <div className={styles.row}>
                            <div className={styles.rowElement}>
                                <label htmlFor="">First Name:</label>
                                <input className={styles.detailsInputs} type="text" value={profile?.first_name} disabled />
                            </div>
                            <div className={styles.rowElement}>
                                <label htmlFor="">Last Name:</label>
                                <input className={styles.detailsInputs} type="text" value={profile?.last_name} disabled />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.rowElement}>
                                <label htmlFor="">Gender:</label>
                                <select className={styles.detailsInputs} name="gender" value={profile?.gender} disabled>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.rowElement}>
                                <p>Created at:</p>
                                <p className={styles.dates}>{getMonthYear(profile?.created_at)}</p>
                            </div>
                            <div className={styles.rowElement}>
                                <p>Updated at:</p>
                                <p className={styles.dates}>{getMonthYear(profile?.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile