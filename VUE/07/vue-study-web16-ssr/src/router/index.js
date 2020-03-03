import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";

Vue.use(Router);

//导出工厂函数
//由于是服务端渲染，所以客户端有多个，每个用户必须要有单独的router（每一次都创建新的router实例）
//不会相互干扰和污染

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
