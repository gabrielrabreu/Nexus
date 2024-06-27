import { useEffect, useState } from "react";

export const useDarkMode = (initialIsDarkMode: boolean) => {
  const [isDarkMode, setIsDarkMode] = useState(initialIsDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
};
