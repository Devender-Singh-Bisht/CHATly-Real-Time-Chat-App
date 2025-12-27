import styles from "../styles/Spinner.module.css";

function Spinner() {
    return (
        <div className={styles.loaderContainer}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default Spinner