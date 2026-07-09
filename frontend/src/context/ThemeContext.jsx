import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Added 'export' here so Analytics.jsx can import it successfully
export const ThemeContext = createContext();

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      "dark"
    );
  });

  useEffect(() => {
    const html =
      document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else if (theme === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      const systemDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      html.classList.remove(
        "dark",
        "light"
      );

      html.classList.add(
        systemDark ? "dark" : "light"
      );
    }

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const updateTheme = (e) => {
      const html =
        document.documentElement;

      html.classList.remove(
        "dark",
        "light"
      );

      html.classList.add(
        e.matches ? "dark" : "light"
      );
    };

    media.addEventListener(
      "change",
      updateTheme
    );

    return () =>
      media.removeEventListener(
        "change",
        updateTheme
      );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}