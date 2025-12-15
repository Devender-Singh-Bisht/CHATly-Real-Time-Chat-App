import { useContext, useState } from "react";
import { validateRegisterFormActions } from "../utils/validateRegisterFormActions";
import styles from "../styles/Register.module.css";
import toast from "react-hot-toast";
import handleRegister from "../utils/handleRegister";
import { useNavigate } from 'react-router';
import { AuthContext } from "../contexts/AuthContext";


export default function Registration() {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    gender: "",
  });

  // Check if the user already have the token
  if (user === null) return null;

  if (user === true) navigate('/chats', { replace: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (validateRegisterFormActions(form, step)) {
      setStep((s) => s + 1);
    }
  }
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading..")

    try {
      await handleRegister(form);
    } catch (err) {
      toast.error(err.message || "Registration Failed...", { id: toastId });

      return
    } finally {
      setForm({
        email: "", password: "", confirmPassword: "", username: "", firstName: "", lastName: "", bio: "", gender: "",
      });
      setStep(1);
    }

    toast.success("Registration Successfull. Please, Sign In.", { id: toastId });
    navigate("/login", { replace: true });

    console.log("Submitted Data:", form);
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>

        <div className={styles.steps}>
          <span className={step === 1 ? styles.activeStep : styles.step}>
            Account
          </span>
          <span className={step === 2 ? styles.activeStep : styles.step}>
            Personal
          </span>
          <span className={step === 3 ? styles.activeStep : styles.step}>
            Profile
          </span>
        </div>

        {step === 1 && (
          <div className={styles.section}>
            <div>
              <input className={styles.input} name="email" placeholder="Email *" value={form.email} onChange={handleChange} />
              <div className={styles.inputInfo}>Eg: "xyz12@example.com"</div>
            </div>

            <div>
              <input className={styles.input} name="username" placeholder="Username *" value={form.username} onChange={handleChange} required />
              <div className={styles.inputInfo}>Username must be 3-20 characters long and can only include lowercase letter, numbers and underscore.</div>
            </div>

            <div>
              <input className={styles.input} type="password" name="password" placeholder="Password *" value={form.password} onChange={handleChange} required />
              <div className={styles.inputInfo}>Password must be 8–32 characters long and include at least one letter, one number, and one special character.</div>
            </div>

            <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password *" value={form.confirmPassword} onChange={handleChange} required />

          </div>
        )}

        {step === 2 && (
          <div className={styles.section}>
            <input className={styles.input} name="firstName" placeholder="First Name *" value={form.firstName} onChange={handleChange} required />

            <input className={styles.input} name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />

            <select className={styles.input} name="gender" value={form.gender} onChange={handleChange} required >
              <option value="">Select Gender *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className={styles.section}>
            <textarea className={`${styles.input} ${styles.textarea}`} name="bio" placeholder="Short Bio" value={form.bio} onChange={handleChange} />
          </div>
        )}

        <div className={styles.actions}>
          {step > 1 && (
            <button type="button" className={styles.secondaryBtn} onClick={(e) => prevStep(e)} >
              Back
            </button>
          )}

          {step < 3 ? (
            <button type="button" className={styles.primaryBtn} onClick={(e) => nextStep(e)}
            >
              Next
            </button>
          ) : (
            <button type="submit" className={styles.primaryBtn}>
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
