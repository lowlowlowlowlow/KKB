<template>
  <div>
    <!-- 自定义组件双向绑定：:value  @input -->
    <!-- v-bind="$attrs"展开$attrs -->
    <!-- 即不需要特意去定义props 即可使用父级传进来的属性 -->
    <!-- 通过v-bind 绑定$attrs属性，孙子组件组件可以直接获取父父组件传递的值（除了父组件中props声明的）-->
    <!-- 通过v-on绑定$listeners属性 父组件可以获取从孙子组件传来的事件 -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '../../mixin/emitter'
  export default {
    inheritAttrs: false, // 设置为false避免设置到根元素上
    mixin:[emitter],
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        // 派发一个input事件即可
        this.$emit('input', e.target.value)

        // 通知父级执行校验
        //使用$parent增加了耦合
       // this.$parent.$emit('validate')
       // 由于需要使用componentName才能进行dispatch的查找，所以需要在KFormItem里面定义一个componentName进行识别
       this.dispatch('KFormItem','validate')
      }
    },
  }
</script>

<style scoped>

</style>