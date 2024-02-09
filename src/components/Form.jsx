import React from "react";

/**
 * Component for a basic form with a text input and a submit button.
 * @param {Object} props - Component props.
 * @param {function} props.onChange - Function to handle input change.
 * @param {string} props.value - Current value of the input field.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {function} props.onSubmit - Function to handle form submission.
 * @returns {JSX.Element} The JSX for the Form component.
 */
function Form({ onChange, value, placeholder, onSubmit }) {
  /**
   * Handles form submission.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  /**
   * Handles input change.
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button className="btn search__btn" type="submit">
        <svg className="search__icon">
          <use href="src/img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default Form;
