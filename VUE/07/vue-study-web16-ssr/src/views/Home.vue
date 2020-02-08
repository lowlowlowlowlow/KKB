<template>
  <div class="home">
    home page
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  //异步数据通过asyncData编写
  //传入store可以获取store上的状态等
  asyncData({ store, route }) { // 约定预取逻辑编写在预取钩子asyncData中
    route;
    //store.dispatch()会执行函数并返回promise
    // 触发 action 后，返回 Promise 以便确定请求结果
    return store.dispatch("getCount");
  }
}
</script>
