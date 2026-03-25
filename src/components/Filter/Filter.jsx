import React from "react";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import Status from "./Category/Status";

const Filter = ({
  gender,
  setStatus,
  setPageNumber,
  setGender,
  setSpecies,
  species,
  status,
}) => {
  let clear = () => {
    setStatus("");
    setGender("");
    setSpecies("");
    setPageNumber(1);
  };
  return (
    <div>
      <div className="filterToolbar">
        <div>
          <span className="panel-kicker">Refine results</span>
          <h2 className="panel-title">Filters</h2>
          <p className="panel-subtitle">
            Mix status, species, and gender to focus the cast without leaving
            the current page.
          </p>
        </div>
        <button type="button" onClick={clear} className="filterClear">
          Reset
        </button>
      </div>
      <div className="accordion" id="accordionExample">
        <Status
          selectedStatus={status}
          setStatus={setStatus}
          setPageNumber={setPageNumber}
        />
        <Species
          selectedSpecies={species}
          setSpecies={setSpecies}
          setPageNumber={setPageNumber}
        />
        <Gender
          selectedGender={gender}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
};

export default Filter;
