import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import useAsyncData from "./hooks/useAsyncData";
import useDebouncedValue from "./hooks/useDebouncedValue";
import useDocumentMetadata from "./hooks/useDocumentMetadata";
import { emptyCollection, fetchCharacters } from "./services/rickAndMortyApi";
import Filter from "./components/Filter/Filter";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination.jsx";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Cards/CardDetails";
import RequestState from "./components/RequestState/RequestState";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CardDetails />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<CardDetails />} />
          <Route path="/location" element={<Location />} />
          <Route path="/location/:id" element={<CardDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  //HOW TO FETCH DATA FROM A API STEP BY STEP.
  //1. it will update the api everytime there is a change.
  let [pageNumber, setPageNumber] = useState(1);

  //5. se crea otro estado para determinar la busqueda del personaje.
  let [search, setSearch] = useState("");

  // 6. se crea un estado para agregar la funcionalidad del filtro 'status'
  let [status, setStatus] = useState("");

  // 7. se crea un estado para agregar la funcionalidad del filtro 'gender'
  let [gender, setGender] = useState("");

  // 8. se crea un estado para agregar la funcionalidad del filtro 'species'
  let [species, setSpecies] = useState("");

  let debouncedSearch = useDebouncedValue(search);
  let { data: fetchedData, error, isLoading } = useAsyncData({
    requestFn: ({ signal }) =>
      fetchCharacters({
        gender,
        name: debouncedSearch,
        page: pageNumber,
        signal,
        species,
        status,
      }),
    deps: [debouncedSearch, gender, pageNumber, species, status],
    initialData: emptyCollection,
  });
  let { info, results } = fetchedData;
  let showEmptyState = !isLoading && !error && results.length === 0;
  let activeFilters = [
    search ? `Name: ${search}` : null,
    status ? `Status: ${status}` : null,
    gender ? `Gender: ${gender}` : null,
    species ? `Species: ${species}` : null,
  ].filter(Boolean);

  useDocumentMetadata({
    title: "Characters | Rick & Morty Atlas",
    description:
      "Browse Rick and Morty characters with live search, layered filters, and a calm light interface.",
  });

  return (
    <div className="page-shell">
      <div className="container">
        <section className="page-hero">
          <div>
            <span className="page-eyebrow">
              <i className="bi bi-stars" />
              Calm multiverse index
            </span>
            <h1 className="page-title">Find every character without the noise.</h1>
            <p className="page-subtitle">
              A lighter Rick and Morty directory with softer pastel surfaces,
              cleaner filters, and faster search feedback.
            </p>
            <div className="hero-pills">
              <span className="soft-chip">
                <i className="bi bi-search" />
                Live search
              </span>
              <span className="soft-chip">
                <i className="bi bi-funnel" />
                Layered filters
              </span>
              <span className="soft-chip">
                <i className="bi bi-grid-1x2" />
                Detail views
              </span>
            </div>
          </div>
          <div className="summary-grid">
            <article className="summary-card">
              <span className="summary-label">Characters</span>
              <span className="summary-value">{info?.count ?? 0}</span>
              <p className="summary-note">currently available in the API</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Pages</span>
              <span className="summary-value">{info?.pages ?? 0}</span>
              <p className="summary-note">available for this query</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Active filters</span>
              <span className="summary-value">{activeFilters.length}</span>
              <p className="summary-note">stacked across status, gender, species</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Current page</span>
              <span className="summary-value">{pageNumber}</span>
              <p className="summary-note">synced with the visible result set</p>
            </article>
          </div>
        </section>

        <Search
          search={search}
          setPageNumber={setPageNumber}
          setSearch={setSearch}
        />

        <div className="row g-4 align-items-start">
          <div className="col-xl-4 col-lg-5 col-12">
            <aside className="panel filterPanel">
              <Filter
                gender={gender}
                species={species}
                status={status}
                setSpecies={setSpecies}
                setGender={setGender}
                setStatus={setStatus}
                setPageNumber={setPageNumber}
              />
            </aside>
          </div>
          <div className="col-xl-8 col-lg-7 col-12">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">Character archive</span>
                  <h2 className="panel-title">Browse the current result set</h2>
                  <p className="panel-subtitle">
                    Every card links to a calmer detail view with better visual
                    hierarchy and improved loading states.
                  </p>
                </div>
                <div className="activeFilters">
                  {activeFilters.length > 0 ? (
                    activeFilters.map((filter) => (
                      <span className="soft-chip" key={filter}>
                        {filter}
                      </span>
                    ))
                  ) : (
                    <span className="soft-chip">
                      <i className="bi bi-check2-circle" />
                      All characters
                    </span>
                  )}
                </div>
              </div>
              <div className="row g-4">
                <RequestState
                  error={error}
                  isEmpty={showEmptyState}
                  isLoading={isLoading}
                  loadingText="Loading characters..."
                  emptyTitle="No characters found"
                  emptyMessage="Try another search term or soften the active filters."
                />
                {!isLoading && !error ? <Cards page="/" results={results} /> : null}
              </div>
            </section>
          </div>
        </div>

        {!isLoading && !error ? (
          <Pagination
            info={info}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
