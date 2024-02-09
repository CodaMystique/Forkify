import React, { useState } from "react";
import Copyright from "./Copyright";
import Pagination from "./Pagination";
import Preview from "./Preview";

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
      <Copyright></Copyright>
    </div>
  );
}

export default SearchResults;
