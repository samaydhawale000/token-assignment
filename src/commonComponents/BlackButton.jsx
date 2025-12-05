import React from "react";
import "./commonComponent.css";

export default function BlackButton({ style, children, onClick, className }) {
  return (
    <button
      className={`BlackButton ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
