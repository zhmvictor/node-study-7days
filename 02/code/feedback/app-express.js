// 留言板 -- 使用 Express 框架版
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// 模拟数据
const dbData = require('./db/comments.json');

// 创建服务
const app = express();
const port = 3000;

// 公开指定目录，这样就可以直接通过 /public/xxx 的方式访问 public 目录的资源
app.use('/public/', express.static('public'));

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * 配置使用 art-template 模板引擎：
 * 第一个参数：表示当渲染以 .xxx 结尾的文件时，使用 art-template 模板引擎，
 * express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中。
 * 虽然不需要加载 art-template，但是也必须安装，
 * 因为 express-art-template 依赖了 art-template。
 */
app.engine('html', require('express-art-template'));

/**
 * Express 为 response 响应对象提供一个方法：render。
 * render 方法默认不可用，但是如果配置了末班应请就可以使用。
 * res.render('模板名', {模板数据});
 * 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件，
 * 即 Express 约定：开发人员把所有视图文件都放到 views 目录中。
 * 
 * 
 * 修改默认的 views 目录的方法：
 * 第一个参数不可改，表示默认的 views 目录名
 * 第二个参数是页面文件所在的文件夹路径名称
 * app.set('views', path.join(__dirname, 'xxx'));
 */

// 首页
app.get('/', (req, res) => {
  res.render('index.html', {
    comments: dbData.comments
  });
});

// 发表留言页
app.get('/post', (req, res) => {
  res.render('post.html');
});

// 提交评论
app.post('/post', (req, res) => {
  // 1.获取表单 POST 请求体数据
  let comment = req.body;
  // 2.处理
  comment.dateTime = '2020-10-24';
  dbData.comments.unshift(comment);
  // 3.发送响应
  // 重定向，send/redirect 这些 Express 方法会自动结束响应
  res.redirect('/');
});
// app.get('/pinglun', (req, res) => {
//   // req.query 只适用于 GET 请求
//   let comment = req.query;
//   comment.dateTime = '2020-10-24';
//   dbData.comments.unshift(comment);
//   // 重定向
//   res.redirect('/');
// });

// 监听服务
app.listen(port, () => {
  console.log(`app is running at post ${port}`);
});
