import Vue from 'vue'

function create(Component,props) {
  // 组件构造函数如何获取？
  // 1.Vue.extend()
  // 2.render
  const noticeConstructor =  Vue.extend(Component)
  // const vm = new Vue({
  //   // h是createElement, 返回VNode，是虚拟dom
  //   // 需要挂载才能变成真实dom
  //   render: h => h(Component, {props}),
  // }).$mount() // 不指定宿主元素，则会创建真实dom，但是不会追加操作
  console.log('notice',Component)
  const noticeDom = new noticeConstructor({
      //el : document.createElement('div'),
      // data(){
      //     return {
      //         props
      //     }
      // }
      propsData:props
  })

  noticeDom.$mount()

  console.log('comp',noticeDom)
  // 获取真实dom
  document.body.appendChild(noticeDom.$el)

  //const comp = noticeDom.$children[0]


  //删除
  noticeDom.remove = function() {
    document.body.removeChild(noticeDom.$el)
    noticeDom.$destroy()
  }

  return noticeDom

}

export default create