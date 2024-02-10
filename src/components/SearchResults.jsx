import React, { useState } from "react";
import Copyright from "./Copyright";
import Pagination from "./Pagination";
import Preview from "./Preview";

/**
 * Component to display search results.
 * @param {Object} props - Component props.
 * @param {Array} props.recipeList - List of recipes to display.
 * @param {string} props.selectedRecipeId - ID of the selected recipe.
 * @param {function} props.setSelectedRecipeId - Function to set the selected recipe ID.
 * @returns {JSX.Element} The JSX for the SearchResults component.
 */
function SearchResults({ recipeList, selectedRecipeId, setSelectedRecipeId }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipeList.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const totalPages = Math.ceil(recipeList.length / itemsPerPage);

  /**
   * Handles page change in pagination.
   * @param {number} page - The page number to navigate to.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-results">
      <ul className="results">
        <Preview
          recipes={currentRecipes}
          selectedRecipeId={selectedRecipeId}
          setSelectedRecipeId={setSelectedRecipeId}
        />
      </ul>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Copyright />
    </div>
  );
}

export default SearchResults;
