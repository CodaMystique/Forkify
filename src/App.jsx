import React, { useState, useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Spinner from "./components/Spinner";
import Recipe from "./components/Recipe";
import Error from "./components/Error";
import AddRecipe from "./components/AddRecipe";

/**
 * Main application component.
 * @returns {JSX.Element} The JSX for the main application.
 */

// const router = createBrowserRouter({
//   path: "/",
// });

function App() {
  // State hooks
  const [recipeList, setRecipeList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecipeNotFound, setIsRecipeNotFound] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isAddRecipeModalVisible, setIsRecipeModalVisible] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);

  /**
   * Load bookmarks from local storage when the component mounts.
   */
  const loadBookmarksFromLocalStorage = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkList(storedBookmarks);
  };

  useEffect(() => {
    loadBookmarksFromLocalStorage();

    // Check if there is a recipe id in the URL hash and set it as selected if found
    const hash = window.location.hash.substr(1);
    if (hash) {
      setSelectedRecipeId(hash);
    }
  }, []);

  // Define content based on state
  let content = (
    <SearchResults
      recipeList={recipeList}
      selectedRecipeId={selectedRecipeId}
      setSelectedRecipeId={setSelectedRecipeId}
    ></SearchResults>
  );

  if (isRecipeNotFound) {
    content = (
      <Error message="No recipes found for your query! Please try again ;)" />
    );
  }

  /**
   * Handle changes to the recipe list.
   * @param {Array} newRecipeList - The new list of recipes.
   */
  const handleRecipeListChange = (newRecipeList) => {
    if (newRecipeList.length <= 0) {
      setIsRecipeNotFound(true);
    } else {
      setIsRecipeNotFound(false);
      setRecipeList(newRecipeList);
    }
  };

  /**
   * Toggle the visibility of the add recipe modal.
   */
  const toggleAddRecipeModal = () => {
    setIsRecipeModalVisible(!isAddRecipeModalVisible);
  };

  return (
    <div className="container">
      {/* Header component */}
      <Header
        onRecipesChange={handleRecipeListChange}
        onLoadingChange={setIsFetching}
        bookmarkList={bookmarkList}
        selectedRecipeId={selectedRecipeId}
        setSelectedRecipeId={setSelectedRecipeId}
        onAddRecipeClick={toggleAddRecipeModal}
      />
      {/* Display loading spinner if fetching, otherwise display content */}
      {isFetching ? <Spinner /> : content}
      {/* Display selected recipe details */}
      <Recipe
        recipeId={selectedRecipeId}
        bookmarks={bookmarkList}
        setBookmarks={setBookmarkList}
      />
      {/* Display AddRecipe modal */}
      <AddRecipe
        isVisible={isAddRecipeModalVisible}
        setIsVisible={setIsRecipeModalVisible}
      ></AddRecipe>
    </div>
  );
}

export default App;
