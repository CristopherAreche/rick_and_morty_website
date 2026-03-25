import React, { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filter/Category/InputGroup";
import RequestState from "../components/RequestState/RequestState";
import useAsyncData from "../hooks/useAsyncData";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  fetchCharactersByUrls,
  fetchLocationCatalogInfo,
  fetchLocation,
  emptyCatalogInfo,
} from "../services/rickAndMortyApi";

const Location = () => {
  let [id, setID] = useState(1);
  let {
    data: catalogInfo,
    error: catalogError,
    isLoading: isCatalogLoading,
  } = useAsyncData({
    requestFn: ({ signal }) => fetchLocationCatalogInfo({ signal }),
    deps: [],
    initialData: emptyCatalogInfo,
  });
  let { data, error, isLoading } = useAsyncData({
    requestFn: async ({ signal }) => {
      let info = await fetchLocation(id, { signal });
      let results = await fetchCharactersByUrls(info.residents, { signal });

      return { info, results };
    },
    deps: [id],
    initialData: { info: {}, results: [] },
  });
  let { info, results } = data;
  let { name, type, dimension } = info;
  let totalLocations = catalogInfo.count ?? 0;

  useDocumentMetadata({
    title: `${name ? name : "Locations"} | Rick & Morty Atlas`,
    description:
      "Browse Rick and Morty locations dynamically, inspect dimensions, and review each location resident list in a modern light layout.",
  });

  return (
    <div className="page-shell">
      <div className="container">
        <section className="page-hero">
          <div>
            <span className="page-eyebrow">
              <i className="bi bi-globe-americas" />
              Location directory
            </span>
            <h1 className="page-title">Track residents across dimensions and planets.</h1>
            <p className="page-subtitle">
              Explore where characters live with a softer, more readable layout
              that keeps context and residents visible at a glance.
            </p>
            <div className="hero-pills">
              <span className="soft-chip">
                <i className="bi bi-bounding-box" />
                {dimension ? dimension : "Dimension pending"}
              </span>
              <span className="soft-chip">
                <i className="bi bi-diagram-3" />
                {type ? type : "Type pending"}
              </span>
            </div>
          </div>
          <div className="summary-grid">
            <article className="summary-card">
              <span className="summary-label">Location catalog</span>
              <span className="summary-value">{totalLocations}</span>
              <p className="summary-note">locations available in the API</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Dimension</span>
              <span className="summary-value">{dimension ? dimension : "--"}</span>
              <p className="summary-note">where this place exists</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Type</span>
              <span className="summary-value">{type ? type : "--"}</span>
              <p className="summary-note">how the API classifies it</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Residents</span>
              <span className="summary-value">{results.length}</span>
              <p className="summary-note">characters loaded for this place</p>
            </article>
          </div>
        </section>

        <div className="row g-4 align-items-start">
          <div className="col-xl-4 col-lg-5 col-12">
            <aside className="panel">
              <span className="panel-kicker">Navigator</span>
              <h2 className="panel-title">Select a location</h2>
              <p className="panel-subtitle">
                Jump between planets, dimensions, and stations to inspect who
                appears there.
              </p>
              <InputGroup
                disabled={isCatalogLoading || !!catalogError}
                emptyLabel={
                  catalogError
                    ? "Location catalog unavailable"
                    : "Loading locations..."
                }
                id={id}
                setID={setID}
                name="Location"
                total={totalLocations}
              />
            </aside>
          </div>
          <div className="col-xl-8 col-lg-7 col-12">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">Current residents</span>
                  <h2 className="panel-title">{name ? name : "Location pending"}</h2>
                  <p className="panel-subtitle">
                    Each resident opens the same modernized detail view while the
                    surrounding layout keeps the location context visible.
                  </p>
                </div>
                <span className="soft-chip">
                  <i className="bi bi-house-heart" />
                  {results.length} loaded
                </span>
              </div>
              <div className="row g-4">
                <RequestState
                  error={error}
                  isEmpty={!isLoading && !error && results.length === 0}
                  isLoading={isLoading}
                  loadingText="Loading location residents..."
                  emptyTitle="No residents found"
                  emptyMessage="Pick another location to see who lives there."
                />
                {!isLoading && !error ? (
                  <Cards page="/location/" results={results} />
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
