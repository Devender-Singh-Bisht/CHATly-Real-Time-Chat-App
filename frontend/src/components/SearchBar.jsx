import styles from "../styles/SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange =(e) => {
    setQuery(e.target.value);
  }

  const handleClick = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
      <button className={styles.icon} onClick={handleClick}>🔍</button>
    </div>
  );
}
