<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'KForm',
  componentName:"KForm",
  provide() {
    return {
      //利用provide，返回了一个KForm实例，则使用inject的子组件可以直接引用到对应的父KForm，其model、rules都可以在子组件中取出使用
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created(){
    //在此KForm中收集发送了'kkb.form.addField'方法的子组件（不用使用this.$children，解耦）
    this.fields=[]
    this.$on('kkb.form.addField',item=>{
      this.fields.push(item)
    })
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      // [resultPromise]
      //$children产生了耦合
      // const tasks = this.$children
      //   .filter(item => item.prop) // 过滤掉没有prop属性的Item
      //   .map(item => item.validate());

      //与$children解耦
      const tasks=this.fields.map(item=>{
        item.validate()
      })

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style scoped>
</style>