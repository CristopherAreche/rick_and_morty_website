import React from "react";
import styles from "./Search.module.scss";

const Search = ({ search, setSearch, setPageNumber }) => {
  return (
    <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputShell}>
        <i className={`bi bi-search ${styles.searchIcon}`} />
        <input
          aria-label="Search characters"
          value={search}
          onChange={(e) => {
            //cada vez que se busque un personaje en el search bar, la pagina volvera a la numero 1.
            setPageNumber(1);
            //mostrara los personajes que cumplan con el input estalbecido.
            setSearch(e.target.value);
          }}
          className={styles.input}
          placeholder="Search for characters, species, or favorites"
          type="text"
        />
      </div>
      <button type="submit" className={styles.btn}>
        <span>Search</span>
        <i className="bi bi-arrow-up-right" />
      </button>
    </form>
  );
};

export default Search;
