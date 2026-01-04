import styles from "../styles/SearchBar.module.css";
import { useState } from "react";
import { getSearchResults } from "../utils/getSearchResult.utils";

export default function SearchBar({ placeholder = "Search...", setSearchResults }) {
  const [query, setQuery] = useState("");

  const handleChange =(e) => {
    setQuery(e.target.value);
  }

  const handleClick = async (e) => {
    try {
      const results = await getSearchResults(query);
      setSearchResults(results);
    } catch (error) {
      toast.error(error || "Failed to fetching the user")
    }
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
