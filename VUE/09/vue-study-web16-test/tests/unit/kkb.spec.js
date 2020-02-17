import {mount, shallowMount} from '@vue/test-utils'
//shallowMount表示浅层挂载，不会挂载组件的子组件，所以不需要测试子组件时可以用，速度更快
import Kaikeba from '@/components/Kaikeba.vue'

function add(a, b) {
  return a + b;
}

// 测试套件 test suite，里面会有若干测试用例 一个it代表一个测试用例
describe('kkb', () => {
  // 测试用例 test case
  it('测试add函数', () => {
    // 断言 assert
    // 只要有一个失败，则此测试用例没通过
    expect(add(1,1)).toBe(2);
    expect(add(-1,1)).toBe(0);
  })
})

// @vue/test-utils
describe('Kaikeba.vue', () => {
  // 检查组件选项
  //钩子created
  it('要求设置created', () => {
    // 验证created类型为函数
    expect(typeof Kaikeba.created).toBe('function');
  })

  it('message初始值是vue-test', () => {
    // 检查data函数存在性
    expect(typeof Kaikeba.data).toBe('function');

    // 检查.data().message的值是不是'vue-test'
    expect(Kaikeba.data().message).toBe('vue-test');
  })

  //钩子mount
  it('挂载之后data是开课吧', () => {
    // 挂载，确保组件渲染出DOM
    const wrapper = mount(Kaikeba)

    // 获取组件实例
    const vm = wrapper.vm
    expect(vm.message).toBe('开课吧')

  })

  it('点击按钮之后修改内容为按钮点击', () => {
    // 挂载，确保组件渲染出DOM
    const wrapper = mount(Kaikeba)

    // 通过wrapper查询方法find()
    wrapper.find('button').trigger('click')
    
    // 获取span，查看渲染结果
    expect(wrapper.vm.message).toBe('按钮点击')
    expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
    expect(wrapper.find('span').text()).toBe('按钮点击')

    // 改变count，结果希望是count大于1
    wrapper.vm.changeCount()
    wrapper.find('button').trigger('click')
    expect(wrapper.find('span').text()).toBe('count大于1')
  })
})