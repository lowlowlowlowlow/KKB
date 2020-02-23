import React, {Component} from "react";

//HOC: 是个函数，接收一个组件，返回一个新的组件



// function Child(props) {
//   return <div>Child</div>;
// }
// Cmp这里是function或者class组件
// props是组件带过来的参数，与class中的state不同，state是内部定义，相当于vue的data
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};
const foo2 = Cmp => props => {
  return (
    <div className="greenBorder">
      <Cmp {...props} />
    </div>
  );
};

// 从下往上
@foo2
@foo
@foo
//相当于foo2(foo(foo(Child)));
//下面使用可以直接<Child />
// 创建一个child组件用于传递
class Child extends Component {
  render() {
    return <div>Child</div>;
  }
}

// const foo = Cmp => {
//   return props => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };

// const Foo = foo2(foo(foo(Child)));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo /> */}
        {/* 使用装饰器之后的使用方法 */}
        <Child />
      </div>
    );
  }
}
