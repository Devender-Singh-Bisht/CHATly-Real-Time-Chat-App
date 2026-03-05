import { Link, useOutletContext } from "react-router";
import { use, useContext, useState } from "react";
import styles from "../styles/ChatsNavbar.module.css";
import { AuthContext } from "../contexts/AuthContext";

function ChatsNavbar({ activeNav = "chats" }) {

    const { user } = useContext(AuthContext);
    const { visible, setVisible } = useOutletContext();

    const navElements = [
        {
            element: "chats",
            url: "/chats",
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm160-320h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Z" /></svg>
        },
        {
            element: "friends",
            url: "/friends",
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z" /></svg>
        },
        {
            element: "profile",
            url: `/profile/${user?.username}`,
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
        },
    ]

    const eye = {
        closed: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M16 3C26 3 31 12 31 14C31 16 26 25 16 25C6 25 1 16 1 14C1 12 6 3 16 3Z"
                        fill="#FFC44D"
                    />
                    <path
                        d="M16.001 29V25M10.8232 28.3184L11.8592 24.4554M5.999 26.3203L8 22.8573M1.8574 23.1426L4.6854 20.3156M21.1768 28.3184L20.1418 24.4554M26 26.3203L24 22.8563M30.1416 23.1426L27.3136 20.3146M31 14C31 16 26 25 16 25C6 25 1 16 1 14C1 12 6 3 16 3C26 3 31 12 31 14Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>
        ),
        open: (
            <svg
                fill="#2a7b9b"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 98.48 98.48"
                xmlSpace="preserve"
                stroke="#2a7b9b"
                strokeWidth="0.4924"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                    <path d="M97.204,45.788c-0.865-1.02-21.537-24.945-47.963-24.945c-26.427,0-47.098,23.925-47.965,24.946c-1.701,2-1.701,4.902,0.001,6.904c0.866,1.02,21.537,24.944,47.964,24.944c26.426,0,47.098-23.926,47.964-24.946C98.906,50.691,98.906,47.789,97.204,45.788z M57.313,35.215c1.777-0.97,4.255,0.143,5.534,2.485c1.279,2.343,0.875,5.029-0.902,5.999c-1.776,0.971-4.255-0.143-5.535-2.485C55.132,38.871,55.535,36.185,57.313,35.215z M49.241,68.969c-18.46,0-33.995-14.177-39.372-19.729c3.631-3.75,11.898-11.429,22.567-16.021c-2.081,3.166-3.301,6.949-3.301,11.021c0,11.104,9.001,20.105,20.105,20.105s20.106-9.001,20.106-20.105c0-4.072-1.219-7.855-3.3-11.021C76.715,37.812,84.981,45.49,88.612,49.24C83.235,54.795,67.7,68.969,49.241,68.969z" />
                </g>
            </svg>
        )
    }

    const handleEyeClick = () => {
        setVisible(prev => !prev);
    }

    return (

        <nav>
            <aside className={styles.iconNav}>
                <img className={styles.appIcon} src="/favicon.png" alt="" />
                {navElements.map((element) => {
                    return (<Link
                        to={element.url}
                        key={element.element}
                        replace
                        className={`${styles.navIcon} ${activeNav === element.element ? styles.active : ""}`}
                    >{element.svg}</Link>)
                })}
                <div className={styles.navIcon} onClick={handleEyeClick}>
                    {visible ? eye.open : eye.closed}
                </div>
            </aside>
        </nav >
    )
}

export default ChatsNavbar