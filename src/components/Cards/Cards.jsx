import React from "react";
import styles from "./Cards.module.scss";
import { Link } from "react-router-dom";

const Cards = ({ results, page }) => {
  const getBadgeClassName = (status) => {
    if (status === "Alive") {
      return styles.badgeAlive;
    }

    if (status === "Dead") {
      return styles.badgeDead;
    }

    return styles.badgeUnknown;
  };

  if (!results?.length) {
    return null;
  }

  let display = results.map((result) => {
    //destructure all the information needed from results
    let { id, name, image, location, status } = result;
    return (
      //postion relative is for the parent containers
      <Link
        style={{ textDecoration: "none" }}
        to={`${page}${id}`}
        key={id}
        className={`col-xl-4 col-md-6 col-12 ${styles.cardLink}`}
      >
        <article className={styles.card}>
          <div className={styles.imageWrap}>
            <img src={image} alt={name} className={styles.img} />
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <h3 className={styles.name}>{name}</h3>
              <span className={`${styles.badge} ${getBadgeClassName(status)}`}>
                {status}
              </span>
            </div>
            <div>
              <span className={styles.metaLabel}>Last known location</span>
              <p className={styles.metaValue}>{location?.name ?? "Unknown"}</p>
            </div>
          </div>
        </article>
      </Link>
    );
  });

  return <>{display}</>;
};

export default Cards;
