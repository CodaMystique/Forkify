import React, { useState } from "react";
import Form from "./Form.jsx";
import Bookmarks from "./Bookmarks.jsx";

/**
 * Header component for the application.
 * @param {Object} props - Component props.
 * @param {function} props.onRecipesChange - Function to handle recipe change.
 * @param {function} props.onLoadingChange - Function to handle loading state change.
 * @param {Array} props.bookmarkList - List of bookmarked recipes.
 * @param {string} props.selectedRecipeId - ID of the selected recipe.
 * @param {function} props.setSelectedRecipeId - Function to set the selected recipe ID.
 * @param {function} props.onAddRecipeClick - Function to handle adding a recipe.
 * @returns {JSX.Element} The JSX for the Header component.
 */
function Header({
  onRecipesChange,
  onLoadingChange,
  bookmarkList,
  selectedRecipeId,
  setSelectedRecipeId,
  onAddRecipeClick,
}) {
  const [query, setQuery] = useState("");

  /**
   * Fetches recipes based on the search query.
   * @param {string} searchQuery - The search query for recipes.
   * @returns {Promise<Array>} A promise that resolves to an array of recipes.
   * @throws {Error} Throws an error if fetching recipes fails.
   */
  async function fetchRecipes(searchQuery) {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipes = await response.json();
      return recipes.data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      throw error;
    }
  }

  /**
   * Handles the search operation.
   */
  async function handleSearch() {
    try {
      if (query.trim()) {
        onLoadingChange(true);
        setQuery("");
        const recipes = await fetchRecipes(query);
        onRecipesChange(recipes);
        onLoadingChange(false);
      }
    } catch (error) {
      console.error("Error in handleSearch:", error.message);
    }
  }

  /**
   * Handles changes in the search input field.
   * @param {Event} e - The input change event.
   */
  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <header className="header">
      <img src="src/img/logo.png" alt="Logo" className="header__logo" />
      <Form
        onChange={handleChange}
        value={query}
        placeholder="Search over 1,000,000 recipes..."
        onSubmit={handleSearch}
      ></Form>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              onClick={onAddRecipeClick}
            >
              <svg className="nav__icon">
                <use href="src/img/icons.svg#icon-edit"></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
          <li className="nav__item">
            <Bookmarks
              bookmarkList={bookmarkList}
              selectedRecipeId={selectedRecipeId}
              setSelectedRecipeId={setSelectedRecipeId}
            ></Bookmarks>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
