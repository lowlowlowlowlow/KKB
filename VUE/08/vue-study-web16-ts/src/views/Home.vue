<template>
  <div class="home">
    <img src="@/assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <communication></communication> -->
    <!-- <slot-example></slot-example> -->
    <!-- <form-example></form-example> -->
    <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <!-- <p>double counter:{{$store.getters.doubleCounter}}</p> -->

    <p>username: {{username}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import communication from "@/components/communication/index.vue";
import SlotExample from "@/components/slots/index.vue";
import FormExample from "@/components/form/index.vue";
import { Route } from "vue-router";

import { State, Mutation, Action, namespace } from "vuex-class";
import MyMixin from "@/mixins/my-mixin";

const userModule = namespace("user");

@Component({
  name: "app",
  components: {
    HelloWorld,
    communication,
    SlotExample,
    FormExample
  }
  // created () {
  //   this.$store.state = {};
  // },
})
export default class Home extends Mixins(MyMixin) {
  @userModule.State("name")
  username!: string;

  @userModule.Mutation
  setUser!: (userInfo: { name: string; token: string }) => void;

  created() {
    this.setUser({ name: "tom", token: "a mock token" });
  }

  beforeRouteEnter(to: Route, from: Route, next) {
    console.log("beforeRouteEnter");

    next(vm => {
      console.log(vm);
    });
  }
}
</script>
