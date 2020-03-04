import React from "react";

// 创建context 农民种菜, 如果没有匹配到Provider，取值默认值，此处默认值为{themeColor: "pink"}
// 使用默认值以防provider中没有值时consumer无法找到
export const ThemeContext = React.createContext({themeColor: "pink"});
// 接收者 批发商批发菜
export const ThemeProvider = ThemeContext.Provider;

//消费者 吃菜
export const ThemeConsumer = ThemeContext.Consumer;
