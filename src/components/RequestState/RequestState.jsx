import React from "react";

const RequestState = ({
  className = "col-12",
  emptyMessage = "Try a different search or filter.",
  emptyTitle = "No results found",
  error,
  errorTitle = "Something went wrong",
  isEmpty = false,
  isLoading = false,
  loadingText = "Loading...",
}) => {
  if (!isLoading && !error && !isEmpty) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="request-state request-card request-card--loading">
          <div className="request-inner">
            <div className="request-icon">
              <i className="bi bi-stars" />
            </div>
            <h3 className="request-title">{loadingText}</h3>
            <p className="request-text">
              Pulling the latest data from the multiverse right now.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="request-state request-card request-card--error" role="alert">
          <div className="request-inner">
            <div className="request-icon">
              <i className="bi bi-exclamation-diamond" />
            </div>
            <h3 className="request-title">{errorTitle}</h3>
            <p className="request-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="request-state request-card request-card--empty">
        <div className="request-inner">
          <div className="request-icon">
            <i className="bi bi-search-heart" />
          </div>
          <h3 className="request-title">{emptyTitle}</h3>
          <p className="request-text">{emptyMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestState;
