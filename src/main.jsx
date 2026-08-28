import React from "react";
import { createRoot } from "react-dom/client";
import TheFog from "./TheFog.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TheFog />
  </React.StrictMode>
);
