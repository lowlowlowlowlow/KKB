const port = 7070;
const title = "vue项目最佳实践";

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// const bodyParser = require("body-parser");

module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
    port: port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    },
    // before: app => {
    //   app.use(bodyParser.json());
    //   使用.env.development配的假接口
    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;

    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误"
    //       });
    //     }
    //   });

    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"];
    //     const roles = auth.split(' ')[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({
    //       code: 1,
    //       data: roles
    //     });
    //   });
    // }
  },

  configureWebpack: {
    // 向index.html注入标题
    name: title,
  },
  chainWebpack(config) {
    //vue inspect --rules 可以查看当前vue里面的规则
    //vue inspect --rule svg 只查看SVG规则
    //1 修改当前项目默认svg配置:排除icons目录（由于当前的svgloader会处理所有svg文件，而我们的需求不需要，则这里要做处理）
    config.module.rule('svg')
      .exclude.add(resolve('./src/icons'))

    config.module.rule('icons')
      .test(/\.svg$/)
      //.end()回到上一级
         //.include是在test()里面做，所以做完了就返回上一级
        .include.add(resolve('./src/icons')).end()
      .use('svg-sprite-loader')
      //不仅要用use还要用.loader添加loader
      .loader('svg-sprite-loader')
         //.options是在.loader里面做
         // 假设icon的名称以icon-开头
        .options({ symbolId: 'icon-[name]' })

  }
};