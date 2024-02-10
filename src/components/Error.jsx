import React from "react";
import icons from "../assets/icons.svg";

/**
 * Component to display an error message.
 * @param {Object} props - Component props.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The JSX for the Error component.
 */
function Error({ message }) {
  return (
    <div className="error">
      <div>
        <svg>
          <use href={`${icons}#icon-alert-triangle`}></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Error;
