import React from "react";

const InputGroup = ({
  disabled = false,
  emptyLabel,
  id,
  total,
  name,
  setID,
}) => {
  const hasOptions = total > 0;
  const selectValue = hasOptions ? String(id) : "";

  return (
    <div className="input-group mt-4">
      <select
        aria-label={`Pick ${name}`}
        disabled={disabled || !hasOptions}
        onChange={(e) => setID(e.target.value)}
        className="form-select picker-select"
        id={name}
        value={selectValue}
      >
        {!hasOptions ? (
          <option value="">{emptyLabel ?? `Loading ${name.toLowerCase()}s...`}</option>
        ) : (
          [...Array(total).keys()].map((x) => {
            return (
              <option key={x + 1} value={x + 1}>
                {name} - {x + 1}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
};

export default InputGroup;
