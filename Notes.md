# Node.js

# Node.js 第1天

## 1. Node.js 介绍

### Node.js 是什么

- Node.js 不是一门语言、不是库、不是框架
- Node.js 是一个 JavaScript 运行时环境，可以解析和执行 JavaScript 代码
- Node.js 使 JavaScript 可以脱离浏览器运行

- 浏览器中的 JavaScript
  - EcmaScript
    - 基本语法
    - if
    - var
    - function
    - Object
    - Array
  - BOM
  - DOM
- Node.js 中的 JavaScript
  - 没有BOM、DOM
  - 在 Node 这个 JavaScript 执行环境中为 JavaScript 提供了一些服务器级别的操作 API
    - 文件读写
    - 网络服务的构建
    - http 服务器
    - 等处理。。。
- 构建在 Chrome V8 引擎
  - Google Chrome V8 引擎是目前公认的解析执行 JavaScript 最快的
  - Node.js 作者把 Google Chrome V8 引擎移植出来，开发了一个独立的 JavaScript 运行时环境
- Node 使用
  - event-driven 事件驱动
  - non-blocking I/O modal 非阻塞IO模型（异步）
  - lightweight and efficient 轻量和高效
- Node 包生态系统（package ecosystem）
  - npm 是世界上最大的开源生态系统
  - 绝大多数 JavaScript 相关的包都存放在 npm 上托管
  - npm install xxx

### Node.js 能做什么

- Web 服务器后台
- 命令行工具
  - npm（node）
  - git（c 语言）
  - hexo（node）
  - 。。。
- 

### 相关资源

- 《深入浅出Node.js》
  - 朴灵
  - 偏理论，无实战
  - 理解底层原理有帮助
- 《Node.js权威指南》
  - 讲解 API
- 《Node入门》
- 官方文档
- 阮一峰
- CNODE 社区/新手入门

### 学到啥

- B/S 编程
  - Browser-Server
  - 任何服务端技术的 BS 编程模型都是一样，和语言无关
  - Node 是作为我们学习 BS 编程的一个工具
- 模块化编程
  - RequireJs
  - import
  - Node 中的模块化
- Node 常用 API
- 异步编程
  - 回调函数
  - Promise
  - async
  - generator
- Express Web 开发框架
- ES6

## 2. 起步

### Node 执行 JavaScript

- 文件名不要叫 node.js，最好也不要起中文

```
<!-- .js 后缀可以省略 -->
node xxx.js
```

> 使用 node 开发简单的 http 服务器

```
const http = require('http');

// 1. 创建 server
// 2. 监听请求
const server = http.createServer((req, res) => {
  console.log(`服务器请求路径：${req.url}`);
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  // 根据不同的请求路径发送不同的响应
  // 使用 write 方法发起响应，但是比较麻烦
  // 使用 end 来发起响应的同时结束响应，应用比较多
  // end 方法的参数必须是 字符串 或者 二进制格式的数据
  if(req.url === '/') {
    res.end('index');
  }
  if(req.url === '/login') {
    res.end('登录');
  }
  if(req.url === '/reg') {
    res.end('注册');
  }

  /**
   * 注意：
   * 每次请求时有一个 favicon.ico 文件
   * 这个文件是浏览器的默认行为，请求的是网页tab标签左侧的小图标
   */
});
// 3. 绑定端口号，启动服务
server.listen(3000, () => {
  console.log('服务器运行在3000端口');
});
```

## 3. Node 中的 JavaScript

- EcmaScript
  - 没有 DOM、BOM
- 具名核心模块， 如fs、http
- 第三方模块
- 用户自定义模块
  - 相对路径必须加 ./
  - 可以省略文件后缀名
- Node 中没有全局作用域，只有模块作用域（文件作用域）
  - 外部访问不到内部
  - 内部访问不到外部
  - 默认都是封闭的
- 如何进行模块间通信？
  - require 方法的作用
    - 加载文件模块并执行里面的代码
    - 拿到被加载文件模块导出的接口对象
  - exports
    - 导出的是对象
    - 默认是空对象
    - 导出需要被外部文件访问的对象

### 核心模块

Node 为 JavaScript 提供了很多服务器级别的API，这些 API 绝大多数都被包装到一个具名的核心模块中。使用 require 加载核心模块。

- fs 文件操作模块
- http 服务构建模块
- path 路径操作模块
- os 操作系统信息模块
- 等。。。

```
const fs = require('fs');
```

### 用户自定义模块

- require
- exports


## 4. Web 服务器开发

### ip 地址和端口号

- 所有联网的程序都需要进行网络通信。
- 计算机中只有一个物理网卡，而且同一个局域网中，网卡的地址必须只有一个。
- 网卡是通过唯一的ip地址来进行定位的。
- ip 地址用来定位计算机。
- 端口号用来定位具体的应用程序。
- 一切需要联网通信的软件都会占用一个端口号
- 端口号的范围从 0 ~ 65536 之前（2^16）
- 计算机中一些默认端口号，最好不要去使用
  - http 服务端口号默认 80
- 开发过程中一般用些简单好记的即可，例如 3000


### Content-Type

在服务器端默认发送的数据是 utf-8 编码的内容，
但是浏览器不知道你是 utf-8 编码的内容，
浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析。
中文操作系统默认是 gbk 编码，
因此出现了乱码现象，所以发送和接收的编码格式必须相同才可以。

- https://www.oschina.net/（请求头类型参照表，在线工具）
- 不同资源对应的 Content-Type 不一样
- 图片不需要编码
- 一般只为字符数据才指定编码

```
// 1. 结合 fs 发送文件中的内容
// 2. Content-Type
//    https://www.oschina.net/
//    不同资源对应的 Content-Type 不一样
//    图片不需要编码
//    一般只为字符数据才指定编码

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(`服务器请求路径：${req.url}`);
  // url：统一资源定位符
  // 一个 url 最终要对应到一个资源
  const url = req.url;

  if(url === '/') {
    fs.readFile('./resource/hello.html', (err, data) => {
      if(err) {
        // 普通文本：text/plain
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('文件读取失败，请稍后重试！');
      } else {
        // html 文件：text/html
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(data);
      }
    });
  }

  if(url === '/img') {
    fs.readFile('./resource/img.jpg', (err, data) => {
      if(err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('文件读取失败，请稍后重试！');
      } else {
        // 图片不需要编码
        // 我们常说的编码一般指的是：字符编码
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(data);
      }
    });
  }
  
});
// 3. 绑定端口号，启动服务
server.listen(3000, () => {
  console.log('服务器运行在3000端口');
});
```

------------------------
总结：
- Node.js 是什么
  - JavaScript 运行时
  - 不是语言、不是框架，是一个平台
- Node 中的 JavaScript
  - 没有 BOM、DOM
  - EcmaScript
    - 变量
    - 方法
    - 数据类型
    - 内置对象
    - Array
    - Object
    - Date
    - Math
  - Node 为 JavaScript 提供了一些服务器级别的 API
    - 文件操作的能力
    - http 服务的能力
  - 模块系统
    - 在 Node 中没有全局作用域的概念
    - 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    - require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    - 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量名冲突污染的问题
    - 但是某些情况下，模块间需要进行通信
    - 每个模块中，都提供了一个对象：exports
    - 该对象是一个空对象
    - 你要做的是把需要被外部访问的成员手动挂载到 exports 接口对象中
    - 然后谁来 require 这个模块，谁就可以得到模块内部的 exports 接口对象
  - 核心模块
    - 由 Node 提供的具名模块，它们都有自己特殊的名称标识
      - fs
      - http
      - os
      - path
    - 所有核心模块在使用时必须手动使用 require 加载
      - `const fs = require('fs')`
- http
  - require
  - 端口号
    - ip 地址定位计算机
    - 端口号定位具体的应用程序
  - Content-Type
    - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确告诉
    - 不同的资源对应的 Content-Type 不一样，具体参照：https://tool.oschina.net/commons
    - 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  - 通过网络发送文件
    - 发送的不是文件，本质上发送的是文件的内容
    - 当浏览器收到服务器响应内容之后，会根据响应的 Content-Type 进行对应的解析处理

------------------------

# Node.js 第2天

## 5. 留言板

### 模板引擎 art-template

- 模板引擎最早诞生于服务器领域，后来才发展到前端
- `art-template`是模板引擎
- `art-template`即可以在浏览器使用，也可以在 Node 中使用
- **模板引擎不关心字符串内容，只关心能识别的模板标记语法**
- `art-template`模板引擎可以使用插值语法：`{{}}`
- 模板引擎的本质就是字符串解析替换

> 在浏览器中使用 art-template

在浏览器中需要引用 `node_modules/art-template/lib//template-web.js`文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>在浏览器中使用 art-template</title>
</head>
<body>
  <!-- 
    注意：在浏览器中需要引用 lib/template-web.js 文件

    强调：模板引擎不关心字符串内容，只关心能识别的模板标记语法，例如 {{}}
    {{}} 语法被称之为 mustache 语法（中文翻译：八字胡语法）
  -->
  <script src="node_modules/art-template/lib//template-web.js"></script>
  <script type="text/template" id="tpl">
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <p>大家好，我叫： {{ name }}</p>
      <p>年龄：{{ age }}</p>
      <h1>我来自：{{ province }}</h1>
      <p>我喜欢：{{ each hobbies}} {{ $value }} {{ /each }}</p>
    </body>
    </html>
  </script>
  <script>
    let ret = template('tpl', {
      name: 'Jack',
      age: 18,
      province: '北京市',
      hobbies: [
        '写代码',
        '唱歌',
        '画画'
      ]
    });
    console.log(ret);
  </script>
</body>
</html>
```

> 在 Node 中使用 art-template

tpl.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/x-icon" href="D:\myStudy\code\nodeStudy\02-day\favicon.ico" /> 
  <title>{{ title }}</title>
</head>
<body>
  <p>大家好，我叫： {{ name }}</p>
  <p>年龄：{{ age }}</p>
  <h1>我来自：{{ province }}</h1>
  <p>我喜欢：{{ each hobbies}} {{ $value }} {{ /each }}</p>
</body>
</html>
```


node-art-template.js

```
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
```
### 服务端渲染和客户端渲染（day2-08）

- 服务端渲染 和 客户端渲染 的区别
  - 客户端渲染不利于 **SEO** （搜索引擎优化）
  - 服务端渲染是可以被爬虫抓取到，客户端异步渲染是很难被爬虫抓取到的
  - 两者结合使用，如：京东的商品列表采用服务端渲染，目的为了 SEO 搜索引擎优化（能被搜索引擎搜到）；它的商品评论列表，为了用户体验，而且不需要 SEO 优化，所以使用了客户端渲染
  - 客户端渲染异步加载，可以提前加载页面，用户体验更好
  - 考虑 SEO：服务端渲染
  - 不考虑 SEO：客户端渲染

### 留言板小栗子 -- 很重要，有很多不知道的技能

1. /  index.html
2. 开放 publice 目录中的静态资源。当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
3. /post  post.html
4. /pinglun
    1. 接收表单提交数据
    2. 存储表单提交数据
    3. 表单重定向到 / : statusCode、setHeader

### Node 命令行 -- REPL

- Read Eval Print Loop
- 读取 执行 打印 循环
- 菜鸟教程翻译为：交互式解释器（个人觉的翻译的还不错）

-----------------------------------------------------------

总结：

- 网站开发模型
  - 黑盒子
  - 写代码让其变得更智能
  - 按照你设计好的套路供用户使用

- 在 Node 中使用 art-template 模板引擎
  - 安装
  - 加载
  - template.render()
- 客户端渲染和服务端渲染的区别
  - 客户端渲染，最少请求两次，发起ajax请求在客户端使用模板引擎渲染
  - 服务端渲染，客户端拿到的是服务端已经渲染好的
- 处理留言本案例首页数据列表渲染展示
- 处理留言本案例发表留言功能
- 掌握如何解析请求路径中的查询字符串
  - url.parse()
- 如何在 Node 中实现服务器重定向
  - 301 永久重定向，浏览器有记忆，再次请求时根据缓存直接跳到重定向的地址 
  - 302 临时重定向，浏览器无记忆，再次请求时还是执行原来的动作进行跳转
- Node 中的 Console（REPL）使用
  - 命令行 输入 node 进入 REPL

-----------------------------------------------------------

# Node.js 第3天

## 6. Node 中的模块系统

- 模块系统
  - 核心模块
    - fs 文件操作模块
    - http 服务模块
    - url 路径操作模块
    - path 路径处理模块
    - os 操作系统信息
    - 。。。
  - 第三方模块
    - art-template
  - 自定义模块
    - 自己创建的文件
  - 加载规则以及加载机制
  - 循环加载
- npm
- package.json
- Express
  - Node 中的 web 开发框架
  - 高度封装了 http 模块
  - 更加专注于业务，而非底层细节
- 增删改查
  - 使用文件来保存数据（锻炼异步编码）
- MongoDB
- 前端书籍
  - 《JavaScript 高级程序设计》
  - 《JavaScript 语言精粹》
- SEO 资料
  - 有个职位叫 “SEO 专员”

### 什么是模块化？

- 具有文件作用域
- 具有通信规则
  - 加载 require
  - 导出

### CommonJS 模块规范

Node 中的 JavaScript 重要的概念：模块系统

- 模块作用域
- 使用 require 方法加载模块
- 使用 exports 接口对象导出模块对象

> 加载 require

```
const 自定义变量名 = require('模块');
```

两个作用:

- 执行被加载模块中的代码
- 得到被加载模块中的`exports`导出接口对象

> 导出 exports

- Node 中模块作用域，默认文件中所有的成员只在当前模块有效
- 对于希望可以被其他模块访问的成员，需要把这些公开的成员都挂载到 `exports`接口对象中

导出多个成员（必须在对象中）：

```
exports.a = 123;
exports.b = 'hello';
exports.c = function(x, y) {
  return x + y;
}
exports.d = {
  foo: 'bar'
};
```

导出单个成员：（同时使用多个，后者会覆盖前者）

```
module.exports = 'hello';
// 以这个为准，后者会覆盖前者
module.exports = function(x, y) {
  return x + y;
}
```

==解决覆盖问题：导出一个对象==

```
module.exports = {
  add: function(x, y) {
    return x + y;
  },
  str: 'hello' 
};
```

> 原理解析






## 7. Express



