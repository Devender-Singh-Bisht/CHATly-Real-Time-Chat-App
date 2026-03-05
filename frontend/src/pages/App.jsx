import styles from "../styles/App.module.css"
import { Link, useNavigate } from "react-router";
import StandingGirl from "../assets/svgs/StandingGirl.svg"
import SittingBoy from "../assets/svgs/SittingBoy.svg"
import RightArrow from "../assets/svgs/RightArrow.svg"
import Thread from "../assets/svgs/Thread.svg"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MessageCloud from "/images/MessageCloud.png";

function App() {

  const navElements = [
    {
      id: 1,
      name: "Chats",
      url: "/chats"
    },
    {
      id: 2,
      name: "Friends",
      url: "/friends"
    },
    {
      id: 3,
      name: "Sign In",
      url: "/login"
    },
    {
      id: 4,
      name: "Sign Up",
      url: "/register"
    }
  ]

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate("/login")
      return
    }
    navigate("/chats", {replace: true})
  }

  return (
    <>
      <div className={styles.page}>

        <nav className={styles.nav}>
          <Link to={"/"} className={styles.logo}>
            <div className={styles.tooltip}><h2>Chatly</h2></div>
          </Link>

          <ul className={styles.navElements}>
            {
              navElements.map(ele => (
                <li key={ele.id}><Link to={ele.url} >{ele.name}</Link></li>
              ))
            }
          </ul>
        </nav>

        <img src={StandingGirl} className={styles.standingGirl} />
        <img src={SittingBoy} className={styles.sittingBoy} />

        <div className={styles.flower}>
          <svg
            viewBox="0 0 256 256"
            fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" fill="rgb(255, 157, 0)"></path></svg>
        </div>

        <main>
          <div className={styles.punchLine}>
            <h1>See Less. Stay Secure</h1>
            <h6>Messages blur automatically when Private Mode🕵️ is enabled.</h6>
          </div>
          <img src={RightArrow} className={styles.rightArrow} />
          <img src={Thread} className={styles.thread} />
          <img src={MessageCloud} className={styles.messageCloud} />

          <div className={styles.buttons}>
            <button onClick={handleClick}>Get Started</button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App;
