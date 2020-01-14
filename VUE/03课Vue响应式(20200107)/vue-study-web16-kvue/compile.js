// 编译器
// 递归遍历dom树
// 判断节点类型，如果是文本，则判断是否是插值绑定
// 如果是元素，则遍历其属性判断是否是指令或事件，然后递归子元素
class Compiler {
  // el是宿主元素
  // vm是KVue实例
  constructor(el, vm) {
    // 保存kVue实例
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 执行编译
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 遍历el树
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 判断是否是元素
      if (this.isElement(node)) {
        // console.log('编译元素'+node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值绑定'+node.textContent);
        this.compileText(node)

      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }


  isElement(node) {
    return node.nodeType === 1
  }

  isInter(node) {
    // 首先是文本标签，其次内容是{{xxx}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {

    this.update(node, RegExp.$1, 'text')
  }

  // 元素编译
  compileElement(node) {
    // 节点是元素
    // 遍历其属性列表
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定：指令以k-xx="oo"定义 k-text="counter"
      //事件：@click="onClick"
      const attrName = attr.name // k-xx k-text 
      const exp = attr.value // oo counter
      if (this.isDirective(attrName)) {
        //model的情况下，有双向绑定，读取值，赋值
        const dir = attrName.substring(2) // xx text
        // 执行指令
        this[dir] && this[dir](node, exp)
      }
      
      if(this.isEvent(attrName)){
        const dir=attrName.substring(1)
        console.log('dir',dir)
        this.eventHandler(node,dir,exp)
      }
    })
  }


  //判断是否指令
  isDirective(attr) {
    return attr.indexOf('k-') === 0
  }

  //判断是否时间
  isEvent(attr){
    return attr.indexOf('@') === 0
  }

  // 更新函数作用：
  // 1.初始化
  // 2.创建Watcher实例
  update(node, exp, dir) {
    // 初始化
    // 指令对应更新函数xxUpdater
    const fn = this[dir + 'Updater']
    //初始化，对应的key放入this.$vm[exp](data中的数据)
    fn && fn(node, this.$vm[exp])

    // 更新处理，封装一个更新函数，可以更新对应dom元素
    //此处的val是watcher自身的update函数执行后返回的对应key的新数据
    new Watcher(this.$vm, exp, function (val) {
      //更新，可以使用watcher中返回的最新val(详见watcher.js)
      fn && fn(node, val)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }

  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  model(node,exp){
    //model是双向绑定(监听和赋值)
    //update方法只负责赋值和更新
    this.update(node, exp, 'model')

    //事件监听,暂时只监听input方法
    node.addEventListener('input',e=>{
      this.$vm[exp]=e.target.value
    })
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  modelUpdater(node,value){
    //双向绑定中，model多为表单元素赋值
    node.value=value
  }

  eventHandler(node,dir,exp){
    const fn=this.$vm.$options.methods && this.$vm.$options.methods[exp]
    //bind this是因为有时候会需要在函数内部访问当前的实例，所以需要函数内的this指向$vm
    node.addEventListener(dir,fn.bind(this.$vm))
  }
}