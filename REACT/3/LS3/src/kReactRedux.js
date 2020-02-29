import React, {Component} from "react";
// import {bindActionCreators} from "redux";

//创建多级组件之间的数据交换环境
const ValueContext = React.createContext();

//connect是一个hoc，传入一个组件，增强功能封装后返回一个更多功能的组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => {
  return class extends Component {
    // 此时组件的所有生命周期都能获得this.context
    // consumer的另一种写法，使用总context而不是provider和consumer
    static contextType = ValueContext;
    constructor(props) {
      super(props);
      //将props放到state里保存
      this.state = {
        props: {}
      };
    }
    componentDidMount() {
      //从provider-consumer中可知this.context实际上是store
      const {subscribe} = this.context;
      //初始化
      this.update();
      // 订阅(如果只初始化不订阅的话初始化后的变化则不会被告知，所以要订阅)
      subscribe(() => {
        this.update();
      });
    }

    update = () => {
      const {getState, dispatch, subscribe} = this.context;
      //  getState获取当前store的state
      // 由于getState是一个纯函数，执行之后可以当成其为一个数字，所以当作参数传给mapStateToProps
      let stateProps = mapStateToProps(getState());
      let dispatchProps;
      // mapDispatchToProps Object/Function
      if (typeof mapDispatchToProps === "object") {
        //传入的为object时，利用bindActionCreators将mapDispatch中的action封装成带dispatch的每一个action，并返回一个更新后的对象
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      } else if (typeof mapDispatchToProps === "function") {
        //传入的为函数时，利用dispatch执行当前函数，也可以传入ownProps，此处为this.props
        dispatchProps = mapDispatchToProps(dispatch, this.props);
      } else {
        // 默认
        dispatchProps = {dispatch};
      }
      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps
        }
      });
    };
    render() {
      console.log("this.context", this.context); //sy-log
      return <WrappedComponent {...this.state.props} />;
    }
  };
};

export class Provider extends Component {
  render() {
    return (
      <ValueContext.Provider value={this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

//...args相当于传入到单个type里面的所有action
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// {
//     add: () => ({type: "ADD"})
//   }
export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
