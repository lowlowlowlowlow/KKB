// 响应式

//数组响应式
//1、替换数组原型的七个方法
//保存一个克隆体，避免直接修改真正的原型
const arrayPro=Array.prototype
//Object.create(proto, [propertiesObject])
//方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。
//此处即创建一个新的arrayProto对象，以arrayPro作为其原型
const arrayProto=Object.create(arrayPro)   

['push','shift','pop','unshift'].forEach(method=>{
      //开始改造arrayPro上的对应方法
      arrayProto[method]=function(){
        //保留原型中原来的方法
        arrayPro[method].apply(this,arguments)

        //添加一个更新通知方法(覆盖操作)
        //可以有其他的处理，此处简单处理先console
        console.log('执行'+method+'操作')
      }
})

//对象响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get ' + key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的是obj
    return
  }

  //进行传入对象的判断（是数组还是对象）
  if(Array.isArray(obj)){
    //如果是数组，则将obj的原型设置为上面新定义的覆盖了7个变更方法的arrayProto
    obj.__proto__=arrayProto

    for(var i=0;i<obj.length;i++){
      observe(obj[i])
    }
  }else{
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }



}

function set(obj,key,val) {
  defineReactive(obj,key,val)
}


// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooooooooooooo'

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1,2,3] }

// 遍历做响应化处理
observe(obj)

obj.foo
obj.foo = 'fooooooooooooooo'
obj.bar
obj.bar = 'barrrrrrrrrrrrrr'

// obj.baz.a = 10 // no ok
obj.baz = {a:100}
obj.baz.a = 100000

// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong

// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方案：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4)