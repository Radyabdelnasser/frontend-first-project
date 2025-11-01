import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./components/cartContext/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter basename="/frontend-first-project">

    <CartContextProvider>

      <App />

    </CartContextProvider>

  </BrowserRouter>
);
