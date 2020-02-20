import React, { Component, PureComponent } from "react";

export default class PureComponentPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
      // obj: { num: 0 }
    };
  }
  setCount = () => {
    this.setState({
      count: 100
      //, obj: { num: 1000 }
    });
  };
  //需求是如果不满足条件的话组件不进行更新，而不是单纯不进行渲染
  //所以可以用 shouldComponentUpdate来进行判断并返回布尔值，如果满足条件才进行更新并渲染
  //pureComponent已实现这个生命周期函数，所以不用写
  //如果直接使用component，则需要写
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.count !== this.state.count;
  // }
  render() {
    console.log("render");
    const { count } = this.state;
    return (
      <div>
        <h3>PureComponentPage</h3>
        <button onClick={this.setCount}>{count}</button>
      </div>
    );
  }
}
