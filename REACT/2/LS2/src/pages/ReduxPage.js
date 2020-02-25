import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    // 订阅
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  add = () => {
    // 派发操作
    store.dispatch({type: "ADD"});
  };
  minus = () => {
    store.dispatch({type: "MINUS"});
  };
  //在createStore的时候使用了 applyMiddleware(thunk, logger)，则可以在dispatch中执行异步操作
  // 实际上dispatch再被封装了一层，有了回调函数
  asyAdd = () => {
    // 异步派发操作
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({type: "ADD"});
      }, 1000);
    });
  };
  render() {
    console.log("store", store); //sy-log
    return (
      <div>
        <h3>ReduxPage</h3>
        {/* getState获取数据 */}
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.asyAdd}>asyAdd</button>
      </div>
    );
  }
}
