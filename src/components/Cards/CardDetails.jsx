import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import RequestState from "../RequestState/RequestState";
import useAsyncData from "../../hooks/useAsyncData";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { fetchCharacter } from "../../services/rickAndMortyApi";
import styles from "./CardsDetails.module.scss";

const CardDetails = () => {
  let { id } = useParams();
  let { pathname } = useLocation();
  let { data: fetchedData, error, isLoading } = useAsyncData({
    requestFn: ({ signal }) => fetchCharacter(id, { signal }),
    deps: [id],
    initialData: {},
  });
  let { name, image, location, origin, gender, species, status, type } =
    fetchedData;
  let isEpisodeView = pathname.startsWith("/episodes/");
  let isLocationView = pathname.startsWith("/location/");
  let backLink = "/";
  let backLabel = "Back to characters";

  if (isEpisodeView) {
    backLink = "/episodes";
    backLabel = "Back to episodes";
  } else if (isLocationView) {
    backLink = "/location";
    backLabel = "Back to locations";
  }

  const getStatusClassName = (currentStatus) => {
    if (currentStatus === "Alive") {
      return styles.badgeAlive;
    }

    if (currentStatus === "Dead") {
      return styles.badgeDead;
    }

    return styles.badgeUnknown;
  };

  useDocumentMetadata({
    title: `${name ? name : "Character details"} | Rick & Morty Atlas`,
    description: name
      ? `Review ${name}, including status, species, origin, and last known location inside Rick & Morty Atlas.`
      : "Review Rick and Morty character details in a modern light interface.",
  });

  if (isLoading || error) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className={styles.wrapper}>
            <Link to={backLink} className={styles.backLink}>
              <i className="bi bi-arrow-left" />
              {backLabel}
            </Link>
            <RequestState
              className=""
              error={error}
              isLoading={isLoading}
              errorTitle="Character unavailable"
              loadingText="Loading character details..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="container">
        <div className={styles.wrapper}>
          <Link to={backLink} className={styles.backLink}>
            <i className="bi bi-arrow-left" />
            {backLabel}
          </Link>
          <section className={styles.container}>
            <div className={styles.layout}>
              <div className={styles.mediaPanel}>
                <span className={styles.kicker}>Character portrait</span>
                <div className={styles.imageWrap}>
                  <img src={image} alt={name} className={styles.image} />
                </div>
              </div>
              <div className={styles.infoPanel}>
                <span className={styles.sectionTag}>Rick & Morty archive</span>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.subtitle}>
                  A calmer detail view with essential metadata surfaced first and
                  the rest organized into lightweight cards.
                </p>
                <div className={styles.statusRow}>
                  <span className={`${styles.badge} ${getStatusClassName(status)}`}>
                    {status}
                  </span>
                  <span className={styles.speciesPill}>{species}</span>
                </div>
                <div className={styles.statGrid}>
                  <article className={styles.statCard}>
                    <span className={styles.label}>Gender</span>
                    <p className={styles.value}>{gender}</p>
                  </article>
                  <article className={styles.statCard}>
                    <span className={styles.label}>Type</span>
                    <p className={styles.value}>{type ? type : "Unknown"}</p>
                  </article>
                  <article className={styles.statCard}>
                    <span className={styles.label}>Origin</span>
                    <p className={styles.value}>{origin?.name ?? "Unknown"}</p>
                  </article>
                  <article className={styles.statCard}>
                    <span className={styles.label}>Last known location</span>
                    <p className={styles.value}>{location?.name ?? "Unknown"}</p>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
