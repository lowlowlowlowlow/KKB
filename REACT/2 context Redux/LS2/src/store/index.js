// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kRedux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
      // case "ADD":
      //   return state + action.payload;
      // case "MINUS":
      //   return state - action.payload;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;

//自定义logger
function logger({getState, dispatch}) {
  return dispatch => action => {
    console.log(action.type + "执行了"); //sy-log
    return dispatch(action);
  };
}


//自定义thunk
//接收回调
//action可以是对象或函数
function thunk({getState, dispatch}) {
  return dispatch => action => {
    // action 可以是对象 还可以是函数 ，那不同的形式，操作也不同
    if (typeof action === "function") {
      //作为函数时，传递dispatch进去以防要使用，使用getState获取当前state并传入
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  };
}
