// 类型注解
let var1: string;
var1 = "开课吧";
// var1 = 1

// 类型推论
let var2 = true;
// var2 = 1

// 原始类型：string，number,boolean,undefined,null,symbol
let var3: string | undefined;

// 类型数组
let arr: string[];
arr = ["tom"];

// 任意类型
let varAny: any;
varAny = "xxx";
varAny = 3;

// any用于数组
let arrAny: any[];
arrAny = [1, true, "free"];
arrAny[1] = 100;

// 函数类型约束
function greet(person: string): string {
  return "hello, " + person;
}
const msg = greet("tom");

// void类型
function warn(): void {}

// 对象object,不是原始类型的就是对象类型
function fn1(o: object) {}
fn1({ prop: 0 });
// fn1(1) // no ok

// 正确的姿势
function fn2(o: { prop: number }) {
  o.prop;
}

fn2({ prop: 0 });
// fn2({prop:'tom'}) // no ok

// 类型别名 type，自定义类型
type Prop = { prop: number };
function fn3(o: Prop) {} // 等同于fn2
// type和接口interface的区别，基本完全相同

// interface Prop2 {
//   prop: number
// }

// 类型断言
const someValue: any = "this is a string";
const strLen = (someValue as string).length;

// 联合类型
let union: string | number;
union = "1";
union = 1;

// 交叉类型
type First = { first: number };
type Second = { second: number };
// 扩展新的type
type FirstAndSecond = First & Second;
function fn4(): FirstAndSecond {
  return { first: 1, second: 2 };
}

// 函数
// 1.设置了就是必填参数
// 2.默认值msg = 'abc'
// 3.可选参数？
function greeting(person: string, msg1 = "abc", msg2?: string): string {
  return "";
}
greeting("tom");

// 函数重载：场景主要源码和框架，函数用参数个数、类型或者返回值类型区分同名函数
// 先声明，在实现
// 同名声明有多个
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log("执行重载2");
  } else {
    console.log("执行重载1");
  }
}

// watch()

// 03-class.ts
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {}

  // 方法也有修饰符
  private someMethod() {}

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  // 可用于计算属性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}
class Child extends Parent {
  say() {
    this.bar;
  }
}
const p = new Parent();
const c = new Child();

// 接口
interface Person {
  firstName: string;
  lastName: string;
}
// greeting函数通过Person接口约束参数解构
function greeting2(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
greeting2({ firstName: "Jane", lastName: "User" }); // 正确
// greeting2({firstName: 'Jane'}); // 错误

// 不用泛型
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

// 使用泛型
interface Result<T> {
  ok: 0 | 1;
  data: T;
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
  return { ok: 1, data };
}
// 用尖括号方式指定T为string
getResult<string>("hello");
// 用类型推断指定T为number
getResult(1);

// 装饰器原理
// 各个装饰器根据他修饰的内容不同而传参都不一样
// 类装饰器参数只有一个就是类构造函数
// 表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
  // target是构造函数
  console.log(target === Foo); // true
  target.prototype.log = function() {
    console.log(this.bar);
  };
}

// 方法装饰器有三个参数：1-实例，2-方法名 descriptor相当于defineProperty的descriptor
function dong(target: any, name: string, descriptor: any) {
  console.log(target,name,descriptor);
  
  //descriptor.value代表defineProperty的descriptor的默认行为
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
      console.log('dong~~');
      // 原始逻辑（修改之后执行未修改前的逻辑（更新））
      baz.call(this, val);
  }
}

// 如果包一层，可以传递配置对象进来，更加灵活 此处传进options，类型为string
// 使用时则需要@mua()才可以获得装饰器函数
// 总体来说装饰器基本都是把装饰器函数返回到options身上，所以我们可以直接用
function mua(option: string) {
  // 返回才是装饰器函数
  // 接收两个参数：1-实例，2-属性名称
  return function (target, name) {
    target[name] = option
  }
}


@log
class Foo {
  bar = "bar";

  @mua('mua~~')
  ns!:string;

  @dong
  setBar(val: string) {
    this.bar = val
  }
}

const foo = new Foo();
// @ts-ignore
foo.log();
foo.setBar('abc')