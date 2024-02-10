import React from "react";
import Preview from "./Preview";
import icons from "../assets/icons.svg";

/**
 * Component to display bookmarked recipes.
 * @param {Object} props - Component props.
 * @param {Array} props.bookmarkList - List of bookmarked recipes.
 * @param {string} props.selectedRecipeId - ID of the selected recipe.
 * @param {function} props.setSelectedRecipeId - Function to set the selected recipe ID.
 * @returns {JSX.Element} The JSX for the Bookmarks component.
 */
function Bookmarks({ bookmarkList, selectedRecipeId, setSelectedRecipeId }) {
  return (
    <>
      <button className="nav__btn nav__btn--bookmarks">
        <svg className="nav__icon">
          {/* Replace the hardcoded address with the imported icon */}
          <use href={`${icons}#icon-bookmark`}></use>
        </svg>
        <span>Bookmarks</span>
      </button>
      <div className="bookmarks">
        <ul className="bookmarks__list">
          {bookmarkList.length === 0 ? (
            <div className="message">
              <div>
                <svg>
                  <use href={`${icons}#icon-alert-triangle`}></use>
                </svg>
              </div>
              <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
            </div>
          ) : (
            <Preview
              recipes={bookmarkList}
              selectedRecipeId={selectedRecipeId}
              setSelectedRecipeId={setSelectedRecipeId}
            ></Preview>
          )}
        </ul>
      </div>
    </>
  );
}

export default Bookmarks;
