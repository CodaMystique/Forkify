import React, { useState } from "react";
import InputField from "./InputField";
import Message from "./Message";
import { FORKIFY_API_KEY } from "../util";

/**
 * AddRecipe component with a form for adding new recipes.
 * @param {Object} props - Component props.
 * @param {boolean} props.isVisible - Boolean to indicate if the modal is visible.
 * @param {function} props.setIsVisible - Function to toggle the visibility of the modal.
 * @returns {JSX.Element} The JSX for the AddRecipe component.
 */
function AddRecipe({ isVisible, setIsVisible }) {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    sourceUrl: "",
    image: "",
    publisher: "",
    cookingTime: 0,
    servings: 0,
    ingredients: ["", "", "", "", "", ""],
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  /**
   * Function to handle changes in form inputs.
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cookingTime" || name === "servings") {
      // Convert cookingTime and servings to integers
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else if (name.startsWith("ingredient-")) {
      // Update individual ingredient based on input name
      const index = parseInt(name.split("-")[1], 10) - 1;
      const newIngredients = [...formData.ingredients];
      newIngredients[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        ingredients: newIngredients,
      }));
    } else {
      // Update other form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  /**
   * Function to handle form submission.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format ingredients before sending the POST request
    const formattedIngredients = formData.ingredients.map((ingredient) => {
      const [quantity, unit, description] = ingredient.split(",");
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    // Create data to be sent in the POST request
    const postData = {
      title: formData.title,
      source_url: formData.sourceUrl,
      image_url: formData.image,
      publisher: formData.publisher,
      cooking_time: formData.cookingTime,
      servings: formData.servings,
      ingredients: formattedIngredients,
      key: FORKIFY_API_KEY,
    };

    // API key
    const apiKey = FORKIFY_API_KEY;

    try {
      // Make a POST request to the API
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe. Please try again.");
      }

      // Log the response or handle it as needed
      const data = await response.json();
      setMessage("Recipe added successfully");
      setShowMessage(true);
      console.log("Recipe added successfully:", data);
    } catch (error) {
      setMessage(error.message);
      setShowMessage(true);
      console.error("Error adding recipe:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className={`overlay ${!isVisible && "hidden"}`}></div>
      <div className={`add-recipe-window ${!isVisible && "hidden"}`}>
        <button
          className="btn--close-modal"
          onClick={() => {
            setShowMessage(false);
            setIsVisible(false);
          }}
        >
          &times;
        </button>

        <form className="upload" onSubmit={handleSubmit}>
          {showMessage && <Message message={message}></Message>}
          {!showMessage && (
            <>
              <div className="upload__column">
                <h3 className="upload__heading">Recipe data</h3>

                <InputField
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  name="title"
                  type="text"
                />

                <InputField
                  label="URL"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  required
                  name="sourceUrl"
                  type="text"
                />

                <InputField
                  label="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  name="image"
                  type="text"
                />

                <InputField
                  label="Publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  required
                  name="publisher"
                  type="text"
                />

                <InputField
                  label="Prep time"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  required
                  name="cookingTime"
                  type="number"
                />

                <InputField
                  label="Servings"
                  value={formData.servings}
                  onChange={handleChange}
                  required
                  name="servings"
                  type="number"
                />
              </div>

              <div className="upload__column">
                <h3 className="upload__heading">Ingredients</h3>

                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <InputField
                    key={index}
                    label={`Ingredient ${index}`}
                    value={formData.ingredients[index - 1]}
                    onChange={handleChange}
                    name={`ingredient-${index}`}
                    type="text"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                ))}
              </div>

              <button className="btn upload__btn" type="submit">
                <svg>
                  <use href="src/img/icons.svg#icon-upload-cloud"></use>
                </svg>
                <span>Upload (DISABLED) </span>
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default AddRecipe;
