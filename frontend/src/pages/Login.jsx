import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import styles from '../styles/Login.module.css'
import airplanegif from '../assets/airplaneanimation.gif'
import handleLogin from '../utils/handleLogin';

function Login() {

  const [userDetails, setUserDetails] = useState({ 'email': '', 'password': '' });
  const navigate = useNavigate();

  const handleUpdate = (e, item = "email") => {
    setUserDetails(prev => ({ ...prev, [item]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const toastl = toast.loading("Logging In...");

    try {
      const data = await handleLogin(userDetails.email, userDetails.password);
    } catch (err) {
      toast.error(err.message || "Login Failed...", { id: toastl });
      return
    } finally {
      setUserDetails({'email': "", 'password': ""});
    }
    
    toast.success("Login Successfull.", { id: toastl });
    navigate('/chats', { replace: true });
  }

  return (
    <>
      <section className={styles.page}>

        <div className={styles.main}>

          <div className={styles.imagediv}>
            <img src={airplanegif} alt="Side animation of Airplane" />
            <h1>Sign In</h1>
          </div>

          <form className={styles.loginform} onSubmit={(e) => handleFormSubmit(e)} >
            <div className={styles.formrow}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" placeholder='Email Address' onChange={(e) => handleUpdate(e, "email")} value={userDetails.email} required />
            </div>
            <div className={styles.formrow}>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => handleUpdate(e, "password")} value={userDetails.password} required minLength="8" />
            </div>
            <div className={styles.buttondiv}>
              <button type="submit">Sign In</button>
            </div>
          </form>

        </div>

      </section>

    </>
  )
}

export default Login;
