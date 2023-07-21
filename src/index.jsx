import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";

function ThemeProviderWrapper({ children }) {
  const [theme, setTheme] = useState("light");


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      {children(theme, setTheme)}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProviderWrapper>
      <ThemeProviderWrapper>
        {(theme, setTheme) => (
          <App theme={theme} setTheme={setTheme} />
        )}
      </ThemeProviderWrapper>
    </AuthProviderWrapper>
  </Router>,
  document.getElementById("root")
);
