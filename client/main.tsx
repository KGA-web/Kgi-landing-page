import "./global.css";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

declare global {
  var __REACT_ROOT__: Root | undefined;
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

// Only create root if it doesn't already exist (prevents HMR issues)
if (!globalThis.__REACT_ROOT__) {
  globalThis.__REACT_ROOT__ = createRoot(container);
}

globalThis.__REACT_ROOT__.render(<App />);
