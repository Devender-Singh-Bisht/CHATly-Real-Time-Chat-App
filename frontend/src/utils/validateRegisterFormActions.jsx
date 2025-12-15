import toast from "react-hot-toast";

export const validateRegisterFormActions = (form, step) => {

    if (step === 1) {
        if (!form.email.trim() || !form.username.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
            toast.error("All fields are required.")
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Incorrect Email.")
            return false;
        }

        const usernameRegex = /^(?=.{3,20}$)[a-z][a-z0-9_]+$/;
        if (!usernameRegex.test(form.username)) {
            toast.error("Incorrect Username. It must be 3-20 characters long and can only include lowercase letter, numbers and underscore.")
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#^_-])[A-Za-z\d@$!%*?&.#^_-]{8,32}$/;
        if (!passwordRegex.test(form.password)) {
            toast.error("Invalid password. It must be 8–32 characters long and include at least one letter, one number, and one special character.")
            return false;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Password and Confirm Passowrd does not matched.")
            return false;
        }
    }

    if (step === 2) {
        if (!form.firstName.trim() || !form.lastName.trim() || !form.gender) {
            toast.error("All fields are required.")
            return false;
        }

        const firstNameRegex = /^[A-Za-z ]{2,40}$/;
        if (form.firstName.length < 2 || form.firstName.length >= 40) {
            toast.error("Firstname should contain atleast 2 and atmost 40 characters.")
            return false;
        }
        if (!firstNameRegex.test(form.firstName)) {
            toast.error("Only letters are allowed in firstName.")
            return false;
        }

        const lastNameRegex = /^[A-Za-z ]+$/;
        if (!lastNameRegex.test(form.lastName)) {
            toast.error("Only letters are allowed in lastName.")
            return false;
        }

        if (!["male", "female"].includes(form.gender)) {
            toast.error("Invalid gender.")
            return false;
        }
    }

    if (step === 3) {
        if (form.bio.length > 200) {
            toast.error("Bio can only contain 200 characters.")
            return false;
        }
    }

    return true;
}