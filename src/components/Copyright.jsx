import React from "react";

/**
 * Component to display copyright information.
 * @returns {JSX.Element} The JSX for the Copyright component.
 */
function Copyright() {
  return (
    <p className="copyright">
      &copy; Copyright by{" "}
      <a
        className="twitter-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
      . Use for learning or your portfolio. Don't use to teach. Developed in
      React by Jonas's student{" "}
      <a
        className="twitter-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/CodaMystiqe"
      >
        CodaMystique
      </a>
    </p>
  );
}

export default Copyright;
