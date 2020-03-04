import React, {Component} from "react";
//react库里面创建了history文件，带有createBrowserHistory方法
import {createBrowserHistory} from "history";
import {RouterContext} from "./RouterContext";

export default class BrowserRouter extends Component {
  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  }
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      location: this.history.location
    };
    //this.history.listen的方法会返回一个location参数
    this.unlisten = this.history.listen(location => {
      this.setState({location});
    });
  }
  //有listen函数必定需要有解除监听的函数（组件卸载的时候执行）
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.history,
          location: this.state.location,
          match: BrowserRouter.computeRootMatch(this.state.location.pathname)
        }}>
          {/* this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;
          如果有一个子节点，数据类型是 object ；
          如果有多个子节点，数据类型就是 array */} 
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
