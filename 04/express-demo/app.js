// 0. 安装
// 1. 引包
const express  = require('express');

// 2. 创建 server
const app = express();
const port = 3000;

/**
 * 路由
 * 
 * 路由其实就是一张表
 * 这个表里有具体的映射关系
 * 
 */

// 当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get('/', (req, res) => {
  // 在 Express 中可以直接 req.query 来获取查询字符串参数
  res.send('hello express!!!');

  // 在 Express 中使用模板引擎: res.render('文件名', {模板对象});
  // 具体用法查看 art-template 官方文档：如何让 art-template 结合 Express 使用
});
app.get('/about', (req, res) => {
  // send 方法自动设置响应头，中文不会乱码
  res.send('你好，Express!');
});

// 公开指定目录，这样就可以直接通过 /public/xxx 的方式访问 public 目录的资源
app.use('/public/', express.static('./public/'));

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});





