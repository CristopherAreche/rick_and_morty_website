import React, { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filter/Category/InputGroup";
import RequestState from "../components/RequestState/RequestState";
import useAsyncData from "../hooks/useAsyncData";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  fetchCharactersByUrls,
  fetchEpisode,
  fetchEpisodeCatalogInfo,
  emptyCatalogInfo,
} from "../services/rickAndMortyApi";

const Episodes = () => {
  let [id, setID] = useState(1);
  let {
    data: catalogInfo,
    error: catalogError,
    isLoading: isCatalogLoading,
  } = useAsyncData({
    requestFn: ({ signal }) => fetchEpisodeCatalogInfo({ signal }),
    deps: [],
    initialData: emptyCatalogInfo,
  });
  let { data, error, isLoading } = useAsyncData({
    requestFn: async ({ signal }) => {
      let info = await fetchEpisode(id, { signal });
      let results = await fetchCharactersByUrls(info.characters, { signal });

      return { info, results };
    },
    deps: [id],
    initialData: { info: {}, results: [] },
  });
  let { info, results } = data;
  let { air_date, episode, name } = info;
  let totalEpisodes = catalogInfo.count ?? 0;

  useDocumentMetadata({
    title: `${name ? name : "Episodes"} | Rick & Morty Atlas`,
    description:
      "Explore Rick and Morty episodes, switch between the full catalog, and review each episode cast in a cleaner interface.",
  });

  return (
    <div className="page-shell">
      <div className="container">
        <section className="page-hero">
          <div>
            <span className="page-eyebrow">
              <i className="bi bi-collection-play" />
              Episode browser
            </span>
            <h1 className="page-title">Jump through the show, one episode at a time.</h1>
            <p className="page-subtitle">
              Switch episodes quickly and scan their cast with the same filtered,
              light interface used across the rest of the atlas.
            </p>
            <div className="hero-pills">
              <span className="soft-chip">
                <i className="bi bi-tv" />
                {episode ? episode : "Episode code pending"}
              </span>
              <span className="soft-chip">
                <i className="bi bi-calendar3" />
                {air_date ? air_date : "Air date pending"}
              </span>
            </div>
          </div>
          <div className="summary-grid">
            <article className="summary-card">
              <span className="summary-label">Episode catalog</span>
              <span className="summary-value">{totalEpisodes}</span>
              <p className="summary-note">episodes available in the API</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Episode code</span>
              <span className="summary-value">{episode ? episode : "--"}</span>
              <p className="summary-note">production order label</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Air date</span>
              <span className="summary-value">{air_date ? air_date : "--"}</span>
              <p className="summary-note">when it first aired</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Cast size</span>
              <span className="summary-value">{results.length}</span>
              <p className="summary-note">characters loaded for this episode</p>
            </article>
          </div>
        </section>

        <div className="row g-4 align-items-start">
          <div className="col-xl-4 col-lg-5 col-12">
            <aside className="panel">
              <span className="panel-kicker">Navigator</span>
              <h2 className="panel-title">Select an episode</h2>
              <p className="panel-subtitle">
                Move through the full catalog and see each cast lineup refresh
                instantly.
              </p>
              <InputGroup
                disabled={isCatalogLoading || !!catalogError}
                emptyLabel={
                  catalogError
                    ? "Episode catalog unavailable"
                    : "Loading episodes..."
                }
                id={id}
                setID={setID}
                name="Episode"
                total={totalEpisodes}
              />
            </aside>
          </div>
          <div className="col-xl-8 col-lg-7 col-12">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">Current cast</span>
                  <h2 className="panel-title">{name ? name : "Episode pending"}</h2>
                  <p className="panel-subtitle">
                    The episode cast is rendered as a responsive card grid with
                    loading, error, and empty states baked in.
                  </p>
                </div>
                <span className="soft-chip">
                  <i className="bi bi-people" />
                  {results.length} loaded
                </span>
              </div>
              <div className="row g-4">
                <RequestState
                  error={error}
                  isEmpty={!isLoading && !error && results.length === 0}
                  isLoading={isLoading}
                  loadingText="Loading episode characters..."
                  emptyTitle="No characters in this episode"
                  emptyMessage="Pick another episode to see its cast."
                />
                {!isLoading && !error ? (
                  <Cards page="/episodes/" results={results} />
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
