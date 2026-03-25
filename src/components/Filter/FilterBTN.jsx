import React from "react";

const FilterBTN = ({ name, index, items, task, setPageNumber, value }) => {
  return (
    <div className="form-check">
      <input
        checked={value === items}
        onChange={() => {
          setPageNumber(1);
          task(items);
        }}
        className="filter-option-input"
        type="radio"
        name={name}
        id={`${name}-${index}`}
      />
      <label className="filter-option-label" htmlFor={`${name}-${index}`}>
        {items}
      </label>
    </div>
  );
};

export default FilterBTN;
