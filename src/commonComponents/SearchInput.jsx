import React from "react";

export default function SearchInput({
  onChange,
  value,
  placeholder,
  className,
  style,
}) {
  return (
    <input
      type="text"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`SearchInput ${className}`}
      style={style}
    />
  );
}
