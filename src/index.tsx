import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!) as Root;

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
