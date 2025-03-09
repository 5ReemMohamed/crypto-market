import "../node_modules/flowbite/dist/flowbite.min.js";
import "./index.css";
import App from "./App.jsx";
import CoinContextProvider from "./Context/CoinContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinContextProvider>
        <App />
    </CoinContextProvider>
  </StrictMode>,
)
