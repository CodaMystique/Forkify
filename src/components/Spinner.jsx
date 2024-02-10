import React from "react";
import icons from "../assets/icons.svg";

/**
 * Component to display a spinner.
 * @returns {JSX.Element} The JSX for the Spinner component.
 */
function Spinner() {
  return (
    <div className="spinner">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
}

export default Spinner;
