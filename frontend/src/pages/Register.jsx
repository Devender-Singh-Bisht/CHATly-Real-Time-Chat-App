import { useState } from "react";
import { validateRegisterFormActions } from "../utils/validateRegisterFormActions";
import styles from "../styles/Register.module.css";


export default function Registration() {

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateRegisterFormActions(form, step)) {
      setStep((s) => s + 1);
    }
  }
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <input
              className={styles.input}
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              name="username"
              placeholder="Username *"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className={styles.section}>
            <input
              className={styles.input}
              name="firstName"
              placeholder="First Name *"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            <select
              className={styles.input}
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className={styles.section}>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              name="bio"
              placeholder="Short Bio"
              value={form.bio}
              onChange={handleChange}
            />
          </div>
        )}

        <div className={styles.actions}>
          {step > 1 && (
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={prevStep}
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={nextStep}
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
