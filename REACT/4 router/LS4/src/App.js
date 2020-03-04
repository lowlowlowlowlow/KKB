import React from "react";
// import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import BrowserRouter from "./k-react-router-dom/BrowserRouter";
import Route from "./k-react-router-dom/Route";
import Link from "./k-react-router-dom/Link";
import Switch from "./k-react-router-dom/Switch";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

// 课下写一下404的补录视频

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>
        <Link to="/search/123">search</Link>

        <Link to="/login">登录</Link>

        {/* <Switch location={{pathname: "/user"}}> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <Route path="/children" children={() => <div>children</div>} />
          <Route path="/search/:id" component={SearchComponent} />
          {/* <Route path="/search/:id" children={(props) =>SearchComponent} />
            如果route.js中的<RouterContext.Provider value={props}>不存在
            则此处接收到props的只有SearchComponent，如果有多层嵌套，则更深层的组件就获取不到props
            <RouterContext.Provider></RouterContext.Provider>配合hook.js
            可以获取最接近该子元素的context          
          */}
          <Route path="/render" render={() => <div>render</div>} />
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <PrivateRoute path="/user" component={UserPage} /> */}
          {/* 如果Route没有path参数，将始终被匹配 */}
          <Route render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

function DetailComonent(props) {
  return <div>DetailComonent</div>;
}

function SearchComponent(props) {
  const {id} = props.match.params;
  return (
    <div>
      <div>SearchComponent-{id}</div>
      <Link to="/search/123/detail">详情</Link>
      <Route path="/search/:id/detail" component={DetailComonent} />
    </div>
  );
}
