import React, {Component} from "react";
import {ThemeContext} from "../ThemeContext";

//consumer的使用方式1
//此处定义的.contextType相当于使用了consumer
class ContextTypePage extends Component {
  // 获取对应上下文写法（1）
  // static contextType = ThemeContext;
  // .context,.contextType是默认的属性名不能改
  render() {
    console.log("this", this); //sy-log
    // this.context在任何生命周期都可以访问到
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    );
  }
}
// 获取对应上下文写法（2）
// 只能订阅一个context 并且是类组件
ContextTypePage.contextType = ThemeContext;
export default ContextTypePage;
