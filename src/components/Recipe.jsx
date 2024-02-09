import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import Error from "./Error";

function Recipe({ recipeId, bookmarks, setBookmarks }) {
  const [recipe, setRecipe] = useState(null);
  const [recipeNotFound, setRecipeNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const isBookmarked =
    recipe && bookmarks.some((bookmark) => recipe.id === bookmark.id);

  function handleServings(value) {
    if (value > 0) {
      setServings(value);
    }
  }

  const toggleBookmark = () => {
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      const indexToRemove = updatedBookmarks.findIndex(
        (item) => item.id === recipe.id
      );
      if (indexToRemove !== -1) {
        updatedBookmarks.splice(indexToRemove, 1);
        setBookmarks(updatedBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      }
    } else {
      // Add to bookmarks
      const newBookmark = { ...recipe };
      const updatedBookmarks = [
        ...(JSON.parse(localStorage.getItem("bookmarks")) || []),
        newBookmark,
      ];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        if (!recipeId) {
          return;
        }
        setIsLoading(true);
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
        );

        if (!response.ok) {
          setRecipeNotFound(true);
          setIsLoading(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipeData = await response.json();
        console.log(recipeData);
        setRecipe(recipeData.data.recipe);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error.message);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return recipeNotFound ? (
    <Error message="We could not find that recipe. Please try another one!"></Error>
  ) : (
    <div className="recipe">
      {!recipe && (
        <Message message="Start by searching for a recipe or an ingredient. Have fun!"></Message>
      )}
      {recipe && (
        <>
          <figure className="recipe__fig">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{recipe.title}</span>
            </h1>
          </figure>
          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="src/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipe.cooking_time}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={() => handleServings(servings - 1)}
                >
                  <svg>
                    <use href="src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={() => handleServings(servings + 1)}
                >
                  <svg>
                    <use href="src/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`recipe__user-generated ${recipe.key ? "" : "hidden"}`}
            >
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
            <button className="btn--round" onClick={toggleBookmark}>
              <svg className="">
                <use
                  href={`src/img/icons.svg#${
                    isBookmarked ? "icon-bookmark-fill" : "icon-bookmark"
                  }`}
                ></use>
              </svg>
            </button>
          </div>
          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li className="recipe__ingredient" key={index}>
                  <svg className="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div className="recipe__quantity">
                    {ingredient.quantity &&
                      (ingredient.quantity * servings) / recipe.servings}
                  </div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ingredient.unit}</span>
                    {" " + ingredient.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher">
                {" " + recipe.publisher}
              </span>
              . Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipe.source_url}
              target="_blank"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
