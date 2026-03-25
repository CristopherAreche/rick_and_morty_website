import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const getNavLinkClassName = ({ isActive }) =>
    `nav-link nav-pill${isActive ? " active" : ""}`;

  return (
    <header className="site-nav-wrap">
      <div className="container">
        <nav className="navbar navbar-expand-lg site-nav">
          <Link to="/" className="site-brand">
            <span className="site-brandMark">
              <i className="bi bi-stars" />
            </span>
            <span>Rick & Morty Atlas</span>
          </Link>
          <button
            className="navbar-toggler site-navToggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#siteNavigation"
            aria-controls="siteNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            title="Toggle navigation"
          >
            <i className="bi bi-list open" />
            <i className="bi bi-x-lg close" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="siteNavigation"
          >
            <div className="navbar-nav site-navLinks">
              <NavLink end to="/" className={getNavLinkClassName}>
                Characters
              </NavLink>
              <NavLink to="/episodes" className={getNavLinkClassName}>
                Episodes
              </NavLink>
              <NavLink to="/location" className={getNavLinkClassName}>
                Locations
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
