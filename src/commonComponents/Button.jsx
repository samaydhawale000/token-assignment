import React from "react";
import "./commonComponent.css";

export default function Button({ style, children, onClick, className }) {
  return (
    <button
      className={`common-button ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
