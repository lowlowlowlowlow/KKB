import {PLACEMENT} from "./CONST";
// todo 拓展视频 useState 实现update 以及 DELETIONS

// 下一个子任务
let nextUnitOfWork = null;
// work in progreess 工作中的fiber root
// 当前fiber
let wipRoot = null;

// 现在的根节点
let currentRoot = null;

// 初始化
function render(vnode, container) {
  wipRoot = {
    //vnode最终会变成真实node，并放到container上
    node: container,
    //根组件下肯定不止一个子元素，所以不用child，而且初始化的时候children就是vnode
    props: {children: [vnode]},
    //base用于保存旧的vnode树
    base: currentRoot
  };

  //将第一个wipRood赋值给nextUnitOfWork开始进行performUnitOfWork
  nextUnitOfWork = wipRoot;
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    node = document.createElement(type);
  }
  updateNode(node, props);
  return node;
}

// 构建fiber结构，遍历workInProgressFiber的子节点（第四步）
// diff算法执行处
function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  // 数组
  // 更新  删除 新增
  let prevSibling = null;

  //由于fiber的格式中旧vnode就存在base里面，所以oldFiber为当前fiber的base，此处也就是workInProgressFiber.base
  //同时child是fiber的第一个子元素，所以必须 workInProgressFiber.base.child存在，从0开始遍历
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    // todo 比较 type key

    //新建一个fiber，新建的fiber的base和node都是null
    newFiber = {
      type: child.type, //类型 区分不同的fiber，比如说function class host等
      props: child.props, //属性参数等
      node: null, //真实dom节点
      base: null, //存储fiber，便于去比较
      parent: workInProgressFiber,
      effectTag: PLACEMENT
    };

    //随着遍历，oldFiber不断被替换成其兄弟节点
    //旧vnode每个节点不断往后推，进行比较
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    // parent
    // child
    if (i === 0) {
      //由于fiber的定义是第一个child即为其child属性，所以当i等于0时，把对应的newFiber赋值给workInProgressFiber的child属性
      workInProgressFiber.child = newFiber;
    } else {
      //当i不等于0时，则第二个起，前一个的sibling是当前newFiber
      prevSibling.sibling = newFiber;
      // sibling
    }
    
    //执行完以上之后，将当前newFiber变成pre，开展下一轮遍历，此时这轮的newFiber变成了preSibling
    //新vnode每个节点不断往后推，preSibling(newFiber)与oldFiber进行比较
    prevSibling = newFiber;

  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

// function组件，构建fiber（第三步）
function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  //function中type是函数名，props是参数，则type(props)是执行了函数，children获取了函数化后的dom
  const children = [type(props)];
  reconcilerChildren(fiber, children);
}

// 更新class组件，构建fiber（第三步）
function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render()];
  reconcilerChildren(fiber, children);
}

// 原生标签，，构建fiber（第三步）
function updateHostComponent(fiber) {
  //node是最后由vnode变成的真实node，一定要有
  //初始化时fiber上肯定没有node，没有则create
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  //相当于this.props.children（fiber下的所有子元素）
  const {children} = fiber.props;
  reconcilerChildren(fiber, children);
}

// 执行当前任务，指定下一个任务，具体逻辑看下面实现及注释（第三步）
function performUnitOfWork(fiber) {
  // 执行当前子任务
  // todo
  const {type} = fiber;
  if (typeof type === "function") {
    console.log("ooooo"); //sy-log
    //判断是普通元素标签、function还是class
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // 返回下一个子任务
  // 找到下个任务的原则：先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子元素，寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    //没有兄弟元素，则查找父级的兄弟元素
    nextFiber = nextFiber.parent;
  }
  // return
}

// 看函数里具体注释（第二步）
function workLoop(deadline) {
  // 执行子任务
  // 返回下一个子任务
  // ...
  //有下个子任务，并且当前帧还没有结束，则此次执行workLoop会把所有的fiber执行一次直至全部执行完
  //即不断执行performUnitOfWork(nextUnitOfWork)并每次都返回下一个fiber直至完成
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有子任务了，
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    // commit
    commitRoot();
  }
  // 提交
  requestIdleCallback(workLoop);
}


//fiber间调用这个方法（第一步），传入workLoop，则实现workLoop函数
requestIdleCallback(workLoop);

// 提交（第五步）
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// 提交具体的fiber执行（第五步）
function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找
  let parentNodeFiber = fiber.parent;
  //由于updateFunctionComponent和updateClassComponent中没有使用createNode函数
  //function和class是不存在node的
  //fiber.parent.node(即fber后没有变成真实dom的则排除)
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent;
  }
  const parentNode = parentNodeFiber.node;
  // 更新 删除 新增
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    //往父级的真实dom中添加子级fiber后的真实dom
    parentNode.appendChild(fiber.node);
  }

  //同时对fiber的child和sibling进行处理（遍历）
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {
  render
};
