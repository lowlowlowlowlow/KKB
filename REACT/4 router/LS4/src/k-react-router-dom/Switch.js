import React, {Component} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 找出渲染的，第一个符合匹配的元素，存入element
          // const {location} = context;
          // 优先用props上的location，即  {/* <Switch location={{pathname: "/user"}}> */}传入的
          const location = this.props.location || context.location;
          let element,
            match = null;
          const {children} = this.props;
          // children = [children];
          // // this.props.children  数组形式、对象
          // for (let i = 0; i < children.length; i++) {
          //   let child = children[i];
          //   if (match === null && React.isValidElement(child)) {
          //     element = child;
          //     const path = child.props.path;
          //     match = path
          //       ? matchPath(location.pathname, {...child.props, path})
          //       : context.match;
          //   }
          // }


          //React.isValidElement()判断是否是符合react的元素
          React.Children.forEach(children, child => {
             console.log(child)
            if (match === null && React.isValidElement(child)) {
              element = child;
              const path = child.props.path;
              match = path
                ? matchPath(location.pathname, {...child.props, path})
                : context.match;
                
            }
          });
          // console.log("element", element, React.isValidElement(element)); //sy-log
          // createElement(type, props)
          // return match
          //   ? React.createElement(element.type, {
          //       ...element.props,
          //       location,
          //       computedMatch: match
          //     })
          //   : null;
          // cloneElement(element, otherProps)
          return match
          ? React.cloneElement(element, {
              location,
              computedMatch: match
            })
          : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
