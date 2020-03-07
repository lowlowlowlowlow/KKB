import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage/";
import LoginPage from "../pages/LoginPage/";
import UserPage from "../pages/UserPage/";
import TopBar from "../components/TopBar/";
import BottomNav from "../components/BottomNav/";
import BasicLayout from "../layout/BasicLayout/";
import PrivateRoute from "./PrivateRoute";

const bottomNav = {};

const routes = [
  {
    path: "/",
    title: "首页",
    props: {exact: true},
    component: HomePage
  },
  {
    path: "/login",
    title: "登录",
    component: LoginPage
  },
  {
    path: "/user",
    title: "用户中心",
    component: UserPage
  }
];

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      {/* 能获取到history location match吗，来自context */}
      {/* <BottomNav /> */}
      <Route routes={routes} component={TopBar} />
      <Route component={BottomNav} />
      <Switch>
        {routes.map(item => {
          return (
            <Route
              {...item.props}
              path={item.path}
              key={item.path}
              component={item.component}
            />
          );
        })}
        {/*<PrivateRoute path="/user" component={UserPage}></PrivateRoute>*/}
      </Switch>


      {/*
        <Route component={BasicLayout}>
          <Switch>
            <Route component={LoginPage}></Route>
            <Route component={HomePage}></Route>
          </Switch>
        </Route>
        这种情况是无法渲染BasicLayout的
        因为此时<Switch></Switch>包裹的内容可以当作是<Route component={BasicLayout}>的children
        由于children的优先级比component高，而且此处BasicLayout是使用component的形式来渲染
        所以只会渲染<Switch></Switch>包裹的内容，而不会渲染BasicLayout
      */}
    </Router>
  );
}
