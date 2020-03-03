import React, {Component} from "react";
import {createPortal} from "react-dom";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }

  render() {
    //使用createPortal，第一个参数是渲染的内容，第二个参数是需要将内容“传送”到某个元素上，此处是this.node
    return createPortal(
      <div className="dialog">
        <h3>Dialog</h3>
        {/* this.props.children 的值有三种可能：
        如果当前组件没有子节点，它就是 undefined ;
        如果有一个子节点，数据类型是 object ；
        如果有多个子节点，数据类型就是 array */}
        {this.props.children}
      </div>,
      this.node
    );
  }
}
