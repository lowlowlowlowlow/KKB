import React, {Component, Children} from "react";
import {RouterContext} from "./RouterContext";
//matchPath返回对应match的对象（第一个参数是pathname,第二个参数是对应的props属性值）
import matchPath from "./matchPath";

// 这里的children不管是否匹配match都可以存在，这里能不能直接返回，就不判断了
// match 匹配 children是function或者是节点
// 不match 不匹配  children是function

export default class Route extends Component {
  render() {
    return (
      //利用RouterContext.Consumer可以获得从App.js中的BrowserRouter.js中的RouterContxt.Provider传入的数据
      <RouterContext.Consumer>
        {context => {
          const {path, children, component, render} = this.props;
          //使用window.location.pathname不太灵活，可以直接使用上下文中的location即context.location扩大兼容性
          //优先使用传入的location
          // const match = context.location.pathname === path;
          const location = this.props.location || context.location;
          const match = matchPath(location.pathname, this.props);
          const props = {
            ...context,
            location,
            match
          };
          console.log('newProps',props)
          //  children, component, render 能接收到(history, location match),
          // 所以我们定义在props，传下去


          // match的时候如果children存在：function或者children本身
          // 不match children 或者 null
          // children是和匹配无关
          return (
            //这里必须要再套一层上下文，为嵌套使用
            //先用最接近当前route的上下文来匹配
            //使得每嵌套一层都会获得最新的props，当前没找到，再往上一层找，往上一层之后，再更新一次props,把没找到对应path的props覆盖
            <RouterContext.Provider value={props}>
              {match
                //match的情况下，children存在，先判断children
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    // match的时候如果children存在：function或者children本身
                    //children不是function而是对象的情况下则存在路由嵌套，需要进入再下一层
                    : children
                  //match的情况下，children不存在，则component优先级第二，判断component
                  : component
                  ? React.createElement(component, props)
                  //match情况下，children和component都不存在，则判断render
                  : render
                  ? render(props)
                  : null
                //children不match的情况
                : typeof children === "function"
                ? children(props)
                //children不是function则直接返回null
                : null}
            </RouterContext.Provider>
          );

          // return match ? React.createElement(component, this.props) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
