//分别实现文本节点、html节点、function节点、class节点从vnode变成node的过程

function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log
  // vnode->node
  const node = createNode(vnode);
  //把node更新到container
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (typeof type === "function") {
    node = type.isReactComponent
      ? // node = type.prototype.isReactComponent
        updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    console.log(type)
    node = document.createElement(type);
  } else {
    node = document.createDocumentFragment();
  }
  updateNode(node, props);
  reconcilerChildren(props.children, node);
  return node;
}

function reconcilerChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    // console.log("children", children[i]); //sy-log
    let child = children[i];
    // 遍历 创建元素
    // 判读children[i]类型
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(children[i], node);
      //render(child, node);
    }
  }
}

// 更新节点上属性，如className、nodeValue等
//nextVal是节点的新属性，是一个对象
function updateNode(node, nextVal) {
  //获取对象的所有key，然后更新每一个key对应的value值
  Object.keys(nextVal)
    //将nextVal上的children过滤掉（children不是属性，是子元素）
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        //普通函数则直接赋值
        node[k] = nextVal[k];
      }
    });
}

// function组件，返回node
function updateFunctionComponent(vnode) {
  //type即为function
  //Props是传入function中执行的参数
  const {type, props} = vnode;
  const vvnode = type(props);
  console.log(vvnode)
  //此处type(props)之后又function变成了
  //props: {className: "border function", children: Array(3)}
  //type: "div"
  //当type变成div之后，就可以走到createNode的第三个if处，create一个div
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  //此处type是class，class需要实例化
  const cmp = new type(props); //实例化
  //执行对应index.js里面的render()，渲染内容
  /*
  class ClassComponent extends Component {
    render() {
      const {name} = this.props;
      return <div className="border function">hello, {name}</div>;
    }
  }
  */
  //所以在Component组件中不定义render方法也可以
  const vvnode = cmp.render();
  const node = createNode(vvnode);
  return node;
}
export default {
  render
};
