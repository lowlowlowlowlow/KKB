//本身createStore只接收一个reducer
//此处在ReduxPage调用时想使用中间件，则我们的kRedux中需要传入多一个参数enhancer,增强了功能
export function createStore(reducer, enhancer) {
  //enhancer即applyMiddleware（...middlewares）
  //由于applyMiddleware函数中返回的是一个加强了的createStore，所以此处返回的即加强的createStore
  if (enhancer) {
    //加强自己，这样就可以加强其身上屙dispatch/subscribe等
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let currentListeners = [];
  function getState() {
    return currentState;
  }

  //dispatch时同时执行有订阅的更新
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 监听函数是一个数组，那就循环吧
    currentListeners.map(listener => listener());
  }

  //订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
  }

  // 初始化，使currentState有值
  // 取值的时候，注意一定要保证不和项目中的会重复
  dispatch({type: "@INIT/REDUX-KKB"});

  return {
    getState,
    dispatch,
    subscribe
  };
}

//模拟redux中的applyMiddleware参数
//即在全局添加上middleWare，加强redux的功能
export function applyMiddleware(...middlewares) {
  // 返回一个加强版的createStore函数
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const middleApi = {
      getState: store.getState,
      dispatch
    };
   
    const middlewaresChain = middlewares.map(middleware =>
       // 给middleware参数，比如说dispatch。使其可以在middleware函数内部处理dispatch
      middleware(middleApi)
    );
    //此时middlewaresChain即允许传入参数的（middleApi）middleware的数组

    //此处的dispatch为轮流执行了middlewaresChain里面的middleware
    dispatch = compose(...middlewaresChain)(dispatch);

    //执行加强版的createStore函数之后会返回加强后的store和函数内处理过的dispatch(此处需求是修改dispatch的功能)
    return {
      ...store,

      // 覆盖上面store里的dispatch
      dispatch
    };
  };
}

//聚合方法，执行一连串的reduce
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
    // return () => {};
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
