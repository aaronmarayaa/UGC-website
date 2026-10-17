import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./creator.css";
import "./hiring-hero.css";
import "./video-stories.css";
import "./trusted-by.css";
import "./results.css";
import "./about.css";
import App from "./Portfolio.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
