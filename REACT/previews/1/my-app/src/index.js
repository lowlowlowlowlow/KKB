//React负责逻辑控制，数据 -> VDOM
import React from "react";
//ReactDom渲染实际DOM，VDOM -> DOM
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//<App />是虚拟dom部分，然后将app里面的内容渲染到#root里面成为真实dom
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
