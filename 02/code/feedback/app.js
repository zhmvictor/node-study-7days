/**
 * app 应用程序--留言板小栗子
 *
 * 把当前门模块所有依赖项都声明在文件模块最上面
 * 为了让目录结构保持统一，约定把所有 HTML 文件都放到 views （视图）
 * 开放public目录：为了方便统一处理静态资源，约定把所有的静态资源都存放在 public 目录（供客户端使用的资源）
 *     统一处理：
 *        如果请求路径是以 /public/ 开头，则可认为要获取 public 中的某个资源，
 *        所以可以直接把请求路径当做文件路径来直接进行读取，
 *        此时可以通过代码控制哪些资源可以被用户访问，哪些资源不能被用户访问，增加灵活性。
 *        整个 public 目录中的资源都允许被访问
 */
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');
// 模拟数据
const dbData = require('./db/comments.json');

const server = http.createServer((req, res) => {
  /**
   * 由于用户输入的请求地址动态不确定，可能还带有查询字符串，
   * 所以直接用 req.url 有时无法得到想要匹配的路径。
   * 
   * 用 url.parse() 解析用户输入的地址，
   * 将真正的请求路径与查询字符串分开。
   *      pathname 是不包含查询字符串的请求路径
   *      query 是查询字符串
   */
  const { pathname, query } = url.parse(req.url, true);
  if (pathname === '/') {
    // 首页
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        return res.end('404 Not Found');
      }
      let dataStr = data.toString();
      const htmlStr = template.render(dataStr, {
        comments: dbData.comments,
      });
      res.end(htmlStr);
    });
  } else if (pathname === '/post') {
    // 留言页
    fs.readFile('./views/post.html', (err, data) => {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  } else if (pathname === '/pinglun') {
    // 发表评论
    let comment = query;
    comment.dateTime = '2020-10-24';
    dbData.comments.unshift(comment);
    /**
     * 通过服务器让客户端重定向
     * 1.状态码设置为 302，临时重定向
     * 2.在响应头中通过 Location 告诉客户端往哪重定向
     *
     * 如果客户端发现收到服务器响应的状态码是302，就会自动去响应头中找 Location，对该地址发起新的请求，所以能看到客户端自动跳转。
     */
    res.statusCode = 302;
    res.setHeader('Location', '/');

    // 一次请求对应一次响应，响应结束请求也结束
    res.end();
  } else if (pathname.indexOf('/public/') === 0) {
    // 请求页面访问的静态资源

    /**
     * /public/css/main.css
     * /public/js/main.js
     * /public/lib/bootstrap/
     * /public/img/main.jpg
     */

    /**
     * 读取文件路径加上 "."，表示读取的是当前目录下的文件
     * 若不加 "." 则会读取磁盘根目录下为文件
     */
    fs.readFile(`.${pathname}`, (err, data) => {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  } else {
    // 不存在的页面
    fs.readFile('./views/404.html', (err, data) => {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log('服务器运行在3000端口');
});
