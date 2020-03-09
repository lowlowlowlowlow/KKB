export default class Component {
  //用于判断是class还是function
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
  }
  // render() {
  //   return "ooo";
  // }
}

// export default function Component(props) {
//   this.props = props;

// }

// Component.prototype.isReactComponent = {};
