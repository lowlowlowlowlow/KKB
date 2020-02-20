import React, { Component } from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    // store.subscribe(() => {
    //   console.log("state发生变化了");
    //   强制更新页面渲染，如果不渲染页面上不会看到结果，但实际值已经更新
    //   this.forceUpdate();
    //   也可以在index.js src中执行
    // });
  }
  render() {
    console.log("store", store);
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: "ADD" })}>add</button>
      </div>
    );
  }
}
