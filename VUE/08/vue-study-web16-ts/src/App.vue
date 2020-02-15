<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <Hello2 :msg="msg" />
    <!-- <Hello msg="blabla~" @add-feature="onAddFeature" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

    <!-- el-form -->
    <el-form ref="loginForm"></el-form>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Hello from "./components/Hello.vue";
import Hello2 from "./components/Hello2.vue";
import { Feature } from "@/types";
import moment from 'moment'
import {Form} from 'element-ui'

Component.registerHooks([
  'beforeRouteEnter'
])

@Component({
  components: {
    HelloWorld,
    Hello,
    Hello2
  }
})
export default class App extends Vue {
  msg = moment().format('YYYY/MM/DD')
  
  // 使用@Ref()装饰器
  @Ref() loginForm!: Form;
  
  onAddFeature(f: Feature) {
    console.log("新增特性：" + f.name);
  }

  onSubmit() {
    this.loginForm.validate().then(isValid => {
      if (isValid) {
        console.log('login!!!');
        
      }
    })
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
