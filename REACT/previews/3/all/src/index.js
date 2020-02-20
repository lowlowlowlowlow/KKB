import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/";
import { Provider } from "react-redux";
//provider全局提供store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/* 配合store更新页面展示的方法2  也可以在使用store的页面中使用forceUpdate()
store.subscribe(()=>{
  ReactDOM.render(<App />,
    document.getElementById("root")
  )
})
*/