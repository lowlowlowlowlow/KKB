import React, {Component} from "react";
//模拟祖孙跨级传递的子组件
import ContextTypePage from "./ContextTypePage";
import ConsumerPage from "./ConsumerPage";
import MultipleContextPage from "./MultipleContextPage";
// createContext创建上下文，也需要在子组件中引入，方便子组件使用上下文中的内容
// 此处为子孙组件提供上下文环境，所以使用provider
import {ThemeProvider} from "../ThemeContext";
import {UserProvider} from "../userContext";

// 使用contetx步骤
// 1. 创建 createContext
// 2. Proiver接收value，以保证有传下去的数据
// 3. ****接收 Consumer或者class.contextType
// contractTypePage用于模拟祖孙跨级传递

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "xiaoming"
      }
    };
  }
  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  };
  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <button onClick={this.changeColor}>change color</button>
        <h3>ContextPage</h3>
        {/* 进入上下文  传入的theme可以在子组件中使用*/}
        <ThemeProvider value={theme}>
          {/* 只能订阅一个context  
              contextTypePage为其中一个子组件
          */}
          <ContextTypePage />

          <ConsumerPage />
          {/* 第二个context，包裹在第一个context里面 */}
          <UserProvider value={user}>
                      {/* 第二个子孙组件 */}
            <MultipleContextPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    );
  }
}
