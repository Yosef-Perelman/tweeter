import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "../index.css";

import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </MantineProvider>,
);
