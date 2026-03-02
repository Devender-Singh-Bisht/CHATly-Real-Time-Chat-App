import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import styles from '../styles/Login.module.css'
import handleLogin from '../utils/handleLogin';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import SmileSvg from '../components/svgs/SmileSvg';
import HappySvg from '../components/svgs/HappySvg';
import EyesClosed from '../components/svgs/EyesClosedSvg';

function Login() {

  const [emoji, setEmoji] = useState(null);
  const navigate = useNavigate();
  const { user, handleAuthContextOnLogin } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({ 'email': '', 'password': '' });

  if (user === null) {
    return (
      <div className={styles.page}>
        <Spinner></Spinner>
      </div>
    )
  };

  if (user) navigate('/chats', { replace: true });

  const handleUpdate = (e, item = "email") => {
    setUserDetails(prev => ({ ...prev, [item]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const toastl = toast.loading("Logging In...");

    try {
      const data = await handleLogin(userDetails.email, userDetails.password);
      handleAuthContextOnLogin(data["data"]);
    } catch (err) {
      toast.error(err.message || "Login Failed...", { id: toastl });
      return
    } finally {
      setUserDetails({ 'email': "", 'password': "" });
    }

    toast.success("Login Successfull.", { id: toastl });
    navigate('/chats', { replace: true });
  }

  return (
    <>
      <section className={styles.page}>

        <div className={styles.main}>

          <div className={styles.topCont}>
            <div className={styles.imageDiv}>
              {emoji === "email"
                ? <HappySvg/> :
                  emoji === "password"
                  ? <EyesClosed/> : <SmileSvg />
              }
            </div>
            <h1>Sign In</h1>
          </div>

          <form className={styles.loginform} onSubmit={(e) => handleFormSubmit(e)} >
            <div className={styles.formrow}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" placeholder='Email Address' onChange={(e) => handleUpdate(e, "email")} value={userDetails.email} required onBlur={() => setEmoji(null)} onFocus={() => setEmoji("email")} />
            </div>
            <div className={styles.formrow}>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => handleUpdate(e, "password")} value={userDetails.password} required minLength="8" onBlur={() => setEmoji(null)} onFocus={() => setEmoji("password")} />
            </div>
            <div className={styles.buttondiv}>
              <div>
                <span>Don't have any account?</span>
                <Link to={"/register"} className={styles.link} >Sign Up</Link>
              </div>
              <button type="submit">Sign In</button>
            </div>
          </form>

        </div>

      </section>

    </>
  )
}

export default Login;
