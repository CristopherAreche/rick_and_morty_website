import React from "react";
import styles from "./Search.module.scss";

const Search = ({ setSearch, setPageNumber }) => {
  return (
    <form className="d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5">
      <input
        onChange={(e) => {
          //cada vez que se busque un personaje en el search bar, la pagina volvera a la numero 1.
          setPageNumber(1);
          //mostrara los personajes que cumplan con el input estalbecido.
          setSearch(e.target.value);
        }}
        className={styles.input}
        placeholder="Search for Characters"
        type="text"
      />
      <button
        //esto evitara que la pagina se refresque cada vez que demos click en el boton.
        onClick={(e) => {
          e.preventDefault();
        }}
        className={`${styles.btn} btn btn-primary fs-5`}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
