<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>

    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
// Asyc-validator
import Schema from "async-validator";
import emitter from '../../mixin/emitter'
export default {
  name:"KFormItem",
  componentName:'KFormItem',
  //插入了'form',则可以使用this.form.XX来使用在KForm.vue中的内容
  inject: ["form"],
  mixin:[emitter],
  data() {
    return {
      error: "" // error是空说明校验通过
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });

    //派发事件，通知KForm新增一个关于所有KFormItem的数组，用于KForm的整体验证
    if(this.prop){
      this.dispatch('KForm','kkb.form.addField',[this])
    }

  },
  methods: {
    validate() {
      // 规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];

      // 校验规则描述对象
      const desc = { [this.prop]: rules };
      // 利用校验规则对象创建Schema实例
      const schema = new Schema(desc);
      //{ [this.prop]: value } 在schema.validate()方法中，首个参数是需要校验的key和其对应的value
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          // 校验通过
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
</style>