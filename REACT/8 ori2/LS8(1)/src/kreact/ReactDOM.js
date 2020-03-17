import {PLACEMENT} from "./CONST";
// todo 拓展视频 useState 实现update 以及 DELETIONS

/*
调和阶段(Reconciler)：React 会自顶向下通过递归，遍历新数据生成新的 Virtual DOM，然后通过 Diff 算法，找到需要变更的元素(Patch)，放到更新队列里面去。

渲染阶段(Renderer)：遍历更新队列，通过调用宿主环境的API，实际更新渲染对应元素。宿主环境，比如 DOM、Native、WebGL 等。
React 框架内部运作可以分为 3 层：

Virtual DOM 层：描述 UI
Reconciler 层：负责调用组件生命周期的方法、进行 Diff 运算
Renderer 层：根据不同的平台，渲染出相应的页面，如 ReactDOM 和 ReactNative

Fiber 是如何工作的
1 ReactDOM.render() 和 setState 的时候开始创建更新。
2 将创建的更新加入任务队列，等待调度。
3 在 requestIdleCallback 空闲时执行任务。
4 从根节点开始遍历 Fiber Node，并且构建 WokeInProgress Tree。
5 生成 effectList。
6 根据 EffectList 更新 DOM。

*/


// 下一个子任务
let nextUnitOfWork = null;
// work in progreess 工作中的fiber root
// 当前fiber
let wipRoot = null;

// 现在的根节点
let currentRoot = null;

// 初始化(渲染虚拟dom，根据虚拟dom得到操作对应的fiber节点)
function render(vnode, container) {
  //workInProgressFiberRoot
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
/*
在 React Fiber 中使用了双缓冲技术（double buffering），以 fiber tree 为主，workInProgress tree 为辅。

双缓冲具体指的是 workInProgress tree 构造完毕，得到的就是新的 fiber tree，每个 fiber 上都有个 alternate 属性，也指向一个 fiber，
创建 workInProgress 节点时优先取 alternate，没有的话就创建一个。

fiber 与 workInProgress 互相持有引用，把 current 指针指向 workInProgress tree，丢掉旧的 fiber tree。
旧 fiber 就作为新 fiber 更新的预留空间，达到复用 fiber 实例的目的。
*/
// diff算法执行处
// 此处参数workInProgressFiber是旧fiber，而children是用来制造新的fiber
// 实际上先有fiber，fiber是旧fiber、根据其diff出来的workInProgressFiber是新的fiber，那么丢掉旧fiber，将新的workInProgressFiber替换其位置
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
    /*
    运行时的实例变更为这种结构：
    DOM：真实的 DOM 节点。

    effect： 每个 workInProgress tree 节点上都有一个 effect list 用来存放 diff 结果，当前节点更新完毕会 queue 收集 diff 结果，向上 merge effect list。

    workInProgress：workInProgress tree 是 reconcile 过程中从 fiber tree 建立的当前进度快照，用于断点恢复。

    fiber：fiber tree 与 Virtual DOM tree 类似，用来描述增量更新所需的上下文信息。\
           Fiber 的拆分单位是 fiber tree 上的一个节点 fiber，按 Virtual DOM 节点拆，
           因为 fiber tree 是根据 Virtual DOM tree 构造出来的，树结构一模一样，只是节点携带的信息有差异。
           所以，实际上 Virtual DOM node 粒度的拆分以 fiber 为工作单元，

    Elements：主要是描述 UI 长什么样子（type，props）。
    
    */
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
      //当preSibling为null时，newFiber
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
  //从最外层的index.js中可以知道children就是
  /* 
  <div className="border function">
    hello, {name}
    <p className={color}>defaultProps</p>
  </div>
  */
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

// 看函数里具体注释（第二步），得到虚拟dom的同时制作fiber tree，并第一阶段执行
function workLoop(deadline) {
  // 执行子任务
  // 返回下一个子任务
  // ...
  //有下个子任务，并且当前帧还没有结束，则此次执行workLoop会把所有的fiber执行一次直至全部执行完
  //即不断执行performUnitOfWork(nextUnitOfWork)并每次都返回下一个fiber直至完成
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    
    // 生成并操作下一个fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有子任务了，
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    // commit（进入不可打断阶段（第二阶段））
    commitRoot();
  }
  // 提交执行fiber
  requestIdleCallback(workLoop);
}


//fiber间调用这个方法（第一步），传入workLoop，则实现workLoop函数
requestIdleCallback(workLoop);

// 提交（进入不可打断阶段）（第五步）
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
  //fiber.parent.node(fiber的父级的真实dom是执行其主任务和fiber任务的主体，所以如果不存在的话，则需要一直找到存在真实dom的父级为止)
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent;
  }
  const parentNode = parentNodeFiber.node;
  // 更新 删除 新增
  // 处理副作用
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    //往父级的真实dom中添加子级fiber的真实dom
    parentNode.appendChild(fiber.node);
  }

  //同时对fiber的child和sibling进行处理（遍历）
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {
  render
};
