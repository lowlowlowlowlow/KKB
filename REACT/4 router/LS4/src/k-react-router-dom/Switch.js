import React, {Component} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 找出渲染的，第一个符合匹配的元素，存在element
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
          console.log(context.match)
          React.Children.forEach(children, child => {
            //一开始的时候match为null，则第一个child肯定会进入这个判断
            //当match被赋值不为null时（即找到match了），则往后的child都不会执行这个判断
            if (match === null && React.isValidElement(child)) {
              element = child;
              const path = child.props.path;
              //根据是否有path，有path必定会唯一匹配path
              //例如在app.JS中，有<Route path="/children" children={() => <div>children</div>} />
              //则此时找到了path为/children，则这个Route只匹配/children，不再匹配另外的<Route path="/render" render={() => <div>render</div>} />等
              match = path
                ? matchPath(location.pathname, {
                    ...child.props,
                    path
                  })
                : context.match;
            }
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
          });
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
