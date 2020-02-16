//自动导入批量svg
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

//webpack创建一个以svg目录为上下文的require函数
const req = require.context('./svg', false, /\.svg$/)
//keys()会获取所有的svg文件
req.keys().map(req);

//在vue中注册svg-icon组件，在app中可以直接使用
Vue.component('svg-icon', SvgIcon)