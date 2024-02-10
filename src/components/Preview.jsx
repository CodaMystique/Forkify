import React from "react";
import icons from "../assets/icons.svg";

/**
 * Component for displaying a preview of recipes.
 * @param {Object} props - Component props.
 * @param {Array} props.recipes - Array of recipe objects.
 * @param {string} props.selectedRecipeId - ID of the selected recipe.
 * @param {function} props.setSelectedRecipeId - Function to set the selected recipe ID.
 * @returns {JSX.Element} The JSX for the Preview component.
 */
function Preview({ recipes, selectedRecipeId, setSelectedRecipeId }) {
  console.log(recipes);

  return recipes.map((recipe) => (
    <li className="preview" key={recipe.id}>
      <a
        className={`preview__link ${
          recipe.id === selectedRecipeId ? "preview__link--active" : ""
        }`}
        href={`/#${recipe.id}`}
        onClick={() => setSelectedRecipeId(recipe.id)}
      >
        <figure className="preview__fig">
          <img src={recipe.image_url} alt="Test" />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipe.title}</h4>
          <p className="preview__publisher">{recipe.publisher}</p>
          <div
            className={`preview__user-generated ${recipe.key ? "" : "hidden"}`}
          >
            <svg className="preview__user-icon">
              <use href={`${icons}#icon-user`} />
            </svg>
          </div>
        </div>
      </a>
    </li>
  ));
}

export default Preview;
