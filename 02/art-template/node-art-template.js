/**
 * art-template 模板引擎
 * art-template 不仅可以在浏览器使用，也可以在 node 中使用
 */

/**
 * 在 Node 中使用 art-template 模板引擎
 * 模板引擎最早诞生于服务器领域，后来才发展到前端
 *
 * 1. 安装
 * 2. 在需要使用的文件模块中加载 art-template: require('art-template');
 * 3. 查文档，使用模板引擎的 API
 */

const template = require('art-template');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  fs.readFile('./tpl.html', (err, data) => {
    if (err) {
      return console.log('文件读取失败了');
    }
    // data 是二进制数据，模板引擎需要传字符串，所以需要转换
    const tplStr = data.toString();
    // template.render('模板字符串', 替换对象);
    const ret = template.render(tplStr, {
      name: 'Jack',
      age: 18,
      province: '北京市',
      hobbies: ['写代码', '唱歌', '画画'],
      title: '个人信息'
    });
    
    res.end(ret);
  });
});

server.listen(3000, () => {
  console.log('服务器运行在3000端口');
});





