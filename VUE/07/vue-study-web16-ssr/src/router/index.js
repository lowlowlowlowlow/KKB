import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";

Vue.use(Router);

//导出工厂函数（面对多个客户端使用多个路由，每次用户请求都是一个全新的用户，创建新的路由实例，避免相互污染）
export function createRouter() {
  return new Router({
    routes: [
      { path: "/", component: Home },
      { path: "/about", component: About }
    ]
  });
}
{
//之前export new Router({})是直接输出一个单例