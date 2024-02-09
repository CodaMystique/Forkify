import React from "react";

/**
 * Component for an input field with a label.
 * @param {Object} props - Component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChange - Function to handle input change.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {boolean} props.required - Indicates if the input field is required.
 * @returns {JSX.Element} The JSX for the InputField component.
 */
function InputField({
  label,
  value,
  onChange,
  name,
  type,
  placeholder,
  required,
}) {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputField;
