import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

//Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //通过initMixin来混入了_init
  this._init(options)
}

initMixin(Vue)      //实现init函数
stateMixin(Vue)     //状态相关api $data,$props,$set,$delete,$watch
eventsMixin(Vue)    //事件相关api $on,$once,$off,$emit
lifecycleMixin(Vue) //生命周期api _update,$forceUpdate,$destroy
renderMixin(Vue)    //渲染api _render,$nextTick（异步更新）

export default Vue
