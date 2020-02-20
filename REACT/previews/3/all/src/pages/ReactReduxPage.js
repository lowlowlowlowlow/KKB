import React, { Component } from "react";
import { connect } from "react-redux";

//connect两个参数，第一个是state和actions方法（类似vue的data和methods），第二个是渲染的模板
export default connect(
  //mapStateToProps 把state映射到props
  state => ({ num: state }),

  //mapDispatchToProps 把dispatch映射到props
  {
    add: () => ({ type: "ADD" })
  }
)(
  class ReactReduxPage extends Component {
    render() {
      //由于使用了react-dedux，全局处于<Provider/>中，所以可以使用store里面的内容，获得store里面定义的add等
      const { num, dispatch, add } = this.props;
      console.log("props", this.props);
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{num}</p>
          {/* <button onClick={() => dispatch({ type: "ADD" })}>add</button> */}
          <button onClick={add}>add</button>
        </div>
      );
    }
  }
);
