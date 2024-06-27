import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const _Button: React.FC<ButtonProps> = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className="bg-none border-none outline-none cursor-pointer p-2 text-gray-700 rounded transition-all duration-300 ease-in-out hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Button = _Button;

export { Button };
