import React, { Component } from "react";

export default class SetStatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  //生命周期情况下
  componentDidMount() {
    // this.changeValue(1);

    //原生事件         <button id="test">原生事件*{this.state.counter}</button>
    document.getElementById("test").addEventListener("click", this.setCounter);
  }
  changeValue = v => {
    //setState在合成事件和生命周期中是异步的，这里说的异步其实是批量更新，就是有多个setState情况下一次更新多个（所以有可能不是马上得到最新的counter值），达到了优化性能的目的
    // this.setState(
    //   {
    //     counter: this.state.counter + v
    //   },
    //   () => {
    //     //callback就是再state更新完成之后再执行
    //     console.log("counter", this.state.counter);
    //   }
    // );

    //setState传入的参数为函数时，需要返回一个改变后的自己，此处为state
    this.setState(state => {
      return {
        counter: state.counter + v
      };
    });
  };
  setCounter = () => {
    //setState在setTimeout和原生事件中是同步的 同步是指执行完这两种之后能马上得到最新的counter值
    // setTimeout(() => {

    //此处如果3者同时执行，由于是同一个函数，修改的内容一样，则只会执行this.changeValue(3)，即更新被合并
    this.changeValue(1);
    this.changeValue(2);
    this.changeValue(3);


    // }, 0);
  };
  render() {
    return (
      <div>
        <h3>SetStatePage</h3>
        <button onClick={this.setCounter}>{this.state.counter}</button>
        <button id="test">原生事件*{this.state.counter}</button>
      </div>
    );
  }
}
