import React, {useState, useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

export default connect(
  //mapStateToProps
  ({user}) => ({
    isLogin: user.isLogin
  })
)(function PrivateRoute({children, isLogin, ...rest}) {
  return (
    <Route
    {/* 此处如果在routes.js中，有<PrivateRoute path="/user" component={UserPage}></PrivateRoute>
    若此处使用了{...rest},isLogin的时候使用return children的话，则其上的component方式不会被执行，程序无法继续执行
    只有使用return component，才会继续走到<Redirect></Redirect>

    则需要使用<ProvateRoute>
          <UserPage></UserPage>
    </ProvateRoute> 这种children形式才可以使用        
    isLogin ? (
          children
        )
    */}
      {...rest}
      render={({location}) =>
        isLogin ? (
          //return component
          children
        ) : (
          <Redirect
            to={{pathname: "/login", state: {redirect: location.pathname}}}
          />
        )
      }
    />
  );
});
