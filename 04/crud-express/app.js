/**
 * app.js 入口模块
 * 职责：
 *    创建服务
 *    做服务相关配置
 *        模板引擎
 *        body-parser 解析表单 post 请求
 *        提供静态资源服务
 *    挂载路由
 *    监听端口启动服务
 */

const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('../../node_modules/'));
app.use('/public/', express.static('public'));

// 配置模板引擎和 body-parser 一定在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(port, () => {
  console.log(`running ${port}...`);
});