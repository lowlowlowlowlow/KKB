import React, {useState, useEffect} from "react";
import {ThemeConsumer} from "../ThemeContext";

//consumer的使用方式2
//function和class形式的通用写法，子组件使用
export default function ConsumerPage(props) {
  return (
    <div className="border">
      <h3>ConsumerPage</h3>
      <ThemeConsumer>
        {/* 使用一个自定义变量名来获取到ThemeConsumer身上的内容，此处为ctx*/}
        {ctx => <div className={ctx.themeColor}>文本</div>}
      </ThemeConsumer>
    </div>
  );
}
