//由于使用的是concat,所以调用dispatch方法时传入params参数是数组[]


//自上而下寻找组件
function broadcast(componentName, eventName, params) {
    //遍历所有子元素，如果子元素componentName和传入的componentName相同则派发事件,
    //不相同则在该子元素的内部继续broadcast，则可能会出现多层for循环，消耗性能
    this.$children.forEach(child => {
      var name = child.$options.componentName;
  
      //表示child的$emit方法经过apply，放在child的上下文中执行
      if (name === componentName) {
          //如果找到了，则在当前child的上下文中派发事件
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        //如果没找到，在当前child的上下文中继续向下broadcast，传递需要寻找的componentName，eventName以及可能存在的params
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
      //自下而上寻找组件
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;
  
        //向上查找直到找到相同名称的组件
        //每进入一次循环，若组件存在父组件，则将父组件的componentName赋值给name，再进行下一轮比较
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        //如果找到了则派发事件
        if (parent) {
          //表示parent的$emit方法经过apply，放在parent的上下文中执行
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        //当有人使用broadcast时，先在当前调用broadcast方法的元素的上下文中进行寻找，所以加多一层用call(this,......)而不是直接broadcast(componentName, eventName, params)
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };