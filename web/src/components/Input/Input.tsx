import React, { ChangeEvent, FocusEvent } from "react";

interface InputProps {
  type: string;
  value: string | number | undefined;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, value, placeholder, disabled, onChange, onBlur }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      className="p-2 rounded border border-gray-300 transition-colors duration-300 ease-in-out focus:border-gray-700 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

export { Input };
