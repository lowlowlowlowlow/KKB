<template>
  <div>
    <h2>商品列表</h2>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <nuxt-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "课程列表",
      // vue-meta利用hid确定要更新meta
      meta: [
        { name: "description", hid: "description", content: "set page meta" }
      ],
      link: [{ rel: "favicon", href: "favicon.ico" }]
    };
  },
  data() {
    return {
      goods: []
    }
  },
  //$axios可以直接用axios
  //$get是fetch()风格的请求，可以直接拿到返回的数据中的data里面的数据，不用再用XXX.data来获取data
  //asyncData不能使用this因为其调用时vue实例还不存在
  //asyncData中机制允许传入params来获取对应的数据，即 async asyncData({ $axios, params,error })
  async asyncData({ $axios, error }) {
    const { ok, goods } = await $axios.$get("/api/goods");
    if (ok) {
      // 此处返回的数据会和上面的data中的goods进行合并
      return {
        goods
      };
    }
    // 错误处理
    error({statusCode: 400, message: '数据查询失败请重试~'})
  }
};
</script>