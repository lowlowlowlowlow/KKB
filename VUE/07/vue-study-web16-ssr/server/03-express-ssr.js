// nodejs代码
// express是我们web服务器
const express = require('express')
const path = require('path')
//file system
const fs = require('fs')

// 获取express实例
const server = express()


const Vue = require('vue')

// 2.获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

// 处理favicon，在执行其他get请求之前先把图标请求过来
//npm install serve-favicon -D
const favicon = require('serve-favicon')
//path.join 当前目录地址__dirname   
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))


// 编写路由处理不同url请求
server.get('*', (req, res) => {
  // console.log(req.url);
  // 解析模板名称  /user
  const template = req.url.substr(1) || 'index'
  // 加载模板
  //读取文件 fs.readFileSync
  // buffer 缓冲
  const buffer = fs.readFileSync(path.join(__dirname, `${template}.html`))
  
  // res.send('<strong>hello world</strong>')
  // 1.创建vue实例
  const app = new Vue({
    template: buffer.toString(), // buffer转换为模板字符串
    data() {
      return {msg:'vue ssr'}
    }
  })

  // 3.用渲染器渲染vue实例
  // app是vue实例，可以用渲染器的renderToString方法处理
  // app此处相等于模板引擎
  renderer.renderToString(app).then(html => {
    res.send(html)
  }).catch(err => {
    res.status(500)
    res.send('Internal Server Error, 500!')
  })
})

// 监听端口
server.listen(3000, () => {
  console.log('server running!');

})