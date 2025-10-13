import React from "react";

export default function SelectBox({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  style = {},
  disabled = false,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`SelectBox ${className}`}
      style={style}
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value || option.id} value={option.value || option.id}>
          {option.label || option.name}
        </option>
      ))}
    </select>
  );
}
