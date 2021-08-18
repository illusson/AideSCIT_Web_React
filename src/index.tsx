import React from 'react';
import ReactDOM from 'react-dom';
import './res/css/index.css';
import {BrowserRouter} from "react-router-dom";
import App from "./ts/component/App";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
