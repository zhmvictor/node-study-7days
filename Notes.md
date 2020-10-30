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

### exports 和 module.exports 的区别

#### 区别

- 每个模块中都有一个 module 对象
- module 对象中有一个 exports 对象
- 把需要导出的成员挂载到 module.exports 接口对象中，即`module.exports.xxx = xxx`
- 每次都 `module.exports.xxx = xxx`写法很麻烦
- 为了方便，Node 在每一个模块中都提供了一个成员：`exports`
- `exports === module.exports`结果为 true
- 对于 `module.exports.xxx = xxx`的方式完全可以简写成`exports.xxx = xxx`
- 当一个模块想要导出单个成员时，必须使用：`module.exports = xxx`的方式
- 不要使用 `exports = xxx`，不管用，因为每个模块最终向外`return`的是`module.exports`
- 而 `exports`只是`module.exports`的一个引用
- `exports = xxx`相当于拆开原来的引用，给 exports 指向了一个新的引用
- 所以给`exports`重新赋值，不会影响`modlue.exports`
- 可以用 `exports = module.exports` 重新建立起引用关系

#### 原理解析

> `exports` 和 `module.exports` 指向同一个引用

```
exports.foo = 'bar';
// 等价于
module.exports.foo = 'bar';

console.log(exports === module.exports); // => true
```

```
// exports 底层原理分析--可以认为：

/**
 * 一、
 * 在 Node 中每个模块内部都有一个自己的 module 对象,
 * 该 module 对象中，有一个成员叫 exports，
 * 如果需要对外导出成员，只需要把导出的成员挂载到 module.exports。
 */
// const module = {
//   exports: {
//     foo: 'bar',
//     add: function() {}
//   }
// };

/**
 * 二、
 * 发现，每次导出接口成员时都通过 module.exports.xxx = xxx，写起来麻烦，
 * Node 为了简化操作，专门提供以下一句代码：
 */
// let exports = module.exports;
// 两者一致，说明可以用任何一方导出成员
// console.loh(exports === module.exports); // true


module.exports.foo = 'bar';
module.exports.add = function() {}

/**
 * 三、
 * 谁来 require 我，谁就得到 module.exports。
 * 默认在代码的最后有一句：
 */
// return module.exports;

```


> `[].slice.call(obj);`

```
// 把对象变成数组，以便可以使用数组的方法
// [].slice.call(obj);

/**
 * 解析：
 * 1. call 方法的第一个参数是要绑定的对象，后面参数是函数调用时函数所需的参数
 * 2. slice 方法需要传两个参数，slice(start, end)
 * 3. 这样就可以解释的通为什么要判断 arguments 的长度了
 *    3.1 arguments.length === 1，表示只传了一个参数，即start
 *    3.2 arguments.length === 2，表示传了两个参数，即start和end
 */
Array.prototype.mySlice = function() {
  let start = 0;
  let end = this.length;
  if(arguments.length === 1) {
    start = arguments[0];
  }
  if(arguments.length === 2) {
    start = arguments[0];
    end = arguments[1];
  }
  let tmp = [];
  for(let i = start; i < end; i++) {
    tmp.push(this[i]);
  }
  return tmp;
};

let fakeArr = {
  0: 'abc',
  1: 'efg',
  2: 'haha',
  length: 3
};

console.log([].mySlice.call(fakeArr)); // => ['abc', 'efg', 'haha']
```

### require 方法加载规则

----------------------------
深入了解底层，参考：

《深入浅出 Node.js》中的模块系统章节

blog：[深入Node.js模块机制](https://blog.csdn.net/zhangyuan19880606/article/details/51508699)

----------------------------


#### 模块加载机制

- 优先从缓存加载
- 判断模块标识
  - 核心模块
    - `require('模块名')`
    - 核心模块本质上也是文件
    - 参考 github 源码
  - 自定义模块
    - 首位的 / 表示当前文件模块所属磁盘根目录，所以一般不用
    - `require('../xx/模块名')`，通过路径寻找
  - 第三方模块 `require('模块名')`
    - 先找到当前文件所在目录中的 node_modules 目录
    - node_modules/art-template
    - node_modules/art-template/package.json
    - node_modules/art-template/package.json 中的 main 属性（入口文件）
    - 找到 main 属性中记录的模块的入口文件，如 index.js
    - 若 package.json 文件或 main 指定的入口文件不存在，node 会自动找该目录下的 index.js，作为默认入口文件（这已经涉及 webpack 知识了）
    - 如果以上所有条件都不成立，则会进入上一级目录中的 node_modules 目录，按上述方法查找
    - 如果条件一直不成立，则会逐次向上级目录查找，直到当前磁盘根目录仍找不到
    - 最后报错：`cannot find module xxx`
- Node 官方文档也指出：在代码中，应该只引入本地的软件包 `require('本地软件包')`
- 注意：一个项目有且只有一个 node_modules，放在项目根目录中，以便所有子目录都能找的到

### npm -- node package manager（node 包管理工具）

#### npm 网站

#### npm 命令行工具

> 升级 npm（自己升级自己）

```
npm install --global npm
```

> 常用命令

参考文章：[npm 常用命令详解](https://www.cnblogs.com/PeunZhang/p/5553574.html)

- npm init 
  - npm init -y 跳过向导，快速生成
- npm install
  - 一次性安装全部依赖项
- npm install 包名
  - npm i 包名
  - 只下载
- npm install --sava 包名
  - npm insatll -S 包名
  - 下载并且将依赖项记录在 package.json 的 dependencies 选项中
- npm uninstall 包名
  - npm un 包名
  - 只删除，依赖项记录仍会保存
- npm uninstall --save 包名
  - npm un -S 包名
  - 删除的同时删除依赖信息
- npm help
  - 查看使用帮助
- npm 命令 --help
  - 查看指定命令的使用帮助

#### 解决 npm 被墙问题

使用 npm 淘宝镜像 cnpm，去官网查看下载安装方法

如果不想安装 cnpm 又想使用淘宝服务器来下载：

```
npm install 包名 --registry=https://registry.npm.taobao.org
```

但是每次安装包都要手动执行以上命令很麻烦，可以把这个选项加入配置文件中：

```
npm config set registry https://registry.npm.taobao.org

# 查看 npm 配置信息
npm config list
```

只要配置了上面的命令，则以后所有的`npm install`都会默认通过淘宝服务器来下载

**个人觉得还是安装一个全局的 cnpm 比较方便**

### package.json

- 产品说明书（里面包含安装的软件的信息和其他包相关描述信息）
- `npm init -y` 按照默认配置自动生成 package.json 文件
- 也可以`npm init`自己定义配置信息

### Node 中的非模块成员

在每个模块中，除了 `require`、`exports` 等模块相关的API之外，
还有两个特殊的成员：

- `__dirname` **动态获取** 可以从来获取当前文件模块所属目录的绝对路径
- `__filename` **动态获取** 可以获取当前文件的绝对路径
- `__dirname`和`__filename`是不受执行 node 命令所处路径影响的
- 在文件操作中，使用的路径都统一使用动态的绝对路径
- **模块中的路径标识和文件操作路径不同，就是相对于当前文件模块，相对路径不受node命令所处路径影响**

```
# ./a.txt 不是相对于当前文件路径
# ./a.txt 是相对于执行 node 命令所处的终端路径
# 文件操作路径中，相对路径设计的都是相对于执行 node 命令所处的路径（不是 bug，有其他使用场景，暂未学习到）
# 所以在文件操作中，使用相对路径是不可靠的，需要使用绝对路径
# 使用以上两个 Node 中的属性，动态获取绝对路径

fs.readFile('./a.txt', 'utf8', (err, data) => {
  if(err) {
    throw err;
  }
  console.log(data);
});
```


# Node.js 第4天

- Express
- 基于文件做一套 CRUD

## 7. Express

原生 http 在某些方面不足以满足开发需求，此时需要使用框架来提升开发效率，让我们的代码更高度统一。

Node 中 web 开发框架之一：

- [Express官网](http://expressjs.com/)

### 安装使用

```
// 0. 安装
// 1. 引包
const express  = require('express');

// 2. 创建 server
const app = express();

app.listen(3000, () => {
  console.log('app is running at port 3000');
});
```

### 基本路由

路由
  - 请求方法
  - 请求路径
  - 请求处理函数

get

```
// 当以 GET 方法请求 / 的时候，执行对应的处理函数
app.get('/', (req, res) => {
  res.send('hello express!');
});
```

post

```
// 当以 POST 方法请求 / 的时候，执行对应的处理函数
app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

### 静态服务

```
// 当以 /public/ 开头的时候，去 ./public/ 目录中找对应的资源
app.use('/public/', express.static('./public/'));

// 当省略第一个参数时，可以通过省略 /public 路径的方式找资源
app.use(express.static('./public/'));
```

三种使用静态资源的方式

```
# /public目录下资源
app.use(express.static('public'));

# /static/xxx
app.use('/static', express.static('public'));

app.use('/static', express.static(path.join(__dirname, 'public')));
```

### 模块标识中的 `/` 和 文件操作路径中的 `/`

> 文件操作中的相对路径可以省略 ./

```
/**
 * 在文件操作过程中
 *   ./data/a.txt 相对于当前目录
 *    data/a.txt  相对于当前目录
 *    /data/a.txt 绝对路径：相对于当前文件所处磁盘根目录 
 *    c:/xxx/...  绝对路径
 */
fs.readFile('data/a.txt', (err, data) => {
  if(err) {
    console.log('文件读取失败', err);
    return;
  }
  console.log(data.toString());
}); 
```

> 模块加载中，相对路径中的 ./ 不能省略

```
// 如果这里忽略了 .  则也是磁盘根目录
require('/data/foo.js');

// 相对路径
require('./data/foo.js');
```

### 修改完代码服务自动重启

使用第三方命令行工具`nodemon`来解决频繁修改代码重启服务器问题

`nodemon`是一个基于Node.js开发的一个第三方命令行工具，使用时需要独立安装：

```
# 在任意目录执行该命令都可以
# 也就是说，苏欧欧需要 -g 来安装的包都可以在任意目录执行
npm install nodemon -g
```

安装完毕之后，使用：

```
node app.js

# 使用 nodemon
nodemon app.js
```

只要通过`nodemon app.js`启动的服务，它会监视你的文件变化。当文件发生变化时，自动帮你重启服务器。

### 在 Express 中配置使用 art-template 模板引擎

- [art-template-Github仓库](https://github.com/aui/art-template)
- [art-template官方文档](http://aui.github.io/art-template/)

安装

```
npm install --save art-template
npm install --save express-art-template
```

配置

```
app.engine('art', require('express-art-template'));
```

使用

```
app.get('/', (req, res) => {
  // express 默认会去项目目录中的 views 目录找 index.html
  res.render('index.art', {
    comments: dbData.comments
  });
});
```

如果希望修改默认的 `views` 视图渲染存储目录，可以：

```
// 注意：第一个参数 views 千万不可写错
app.set('views', 目录路径);
```

### 在 Express 获取表单 GET 请求参数

Express 内置 API，通过 `req.query`直接获取

### 在 Express 获取表单 POST 请求体数据

在 Express 中没有内置的获取表单 POST 请求体的 API，因此需要使用一个第三方包：`body-parser`。

安装

```
npm install body-parser -S
```

配置

```
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser
// 只要加入这个配置，则在 req 请求对象上会多出一个属性：body
// 可以直接通过 req.body 获取表单 POST 请求体数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

使用

```
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

### CURD 案例 - 模块化思想 

- 模块职责单一

-----------------------------------------------------
总结：

### 演讲

- 说服
- ppt
- 脑图
- markdown
- 结构思维

- why 找痛点，为什么
- what 解决方案，用什么东西
- how 怎么去使用
- where 在哪使用
- when 什么时候使用


### 回调函数

 > 函数
 
 1. 函数是 js 的一等公民
 2. 函数也是一种数据类型，既可以当做参数传递，也可以作为方法的返回值

> 回调函数

Google 官方解释：回调函数 作为参数 传递给其他函数，只有 父函数执行完成 它才会执行。

以上说法解释了：

1. 为什么可以使用回调函数获取异步操作数据？因为需要等父函数执行完，回调函数才会执行。
2. 为什么叫回调函数？父函数执行完后再回头调用内部的回调函数。


- 一般情况下，把函数作为参数的目的是为了获取函数内部的异步操作结果
- 需要获取函数内部异步操作的结果，用回调函数 callback，回调函数就是传入函数的参数

```
function add (x, y, callback) {
  setTimeout(function(){
    let ret = x + y;
    callback(ret);
  }, 1000);
}

add(10, 20, function(ret) {
  console.log(ret);
});
```


### 单线程


### 事件循环

### JavaScript 模块化问题

- ES6 支持模块化了
- ES5 天生不支持模块化
  - require
  - exports
  - Node.js 才有
- 浏览器中也可以像在 Node 中的模块一样来进行编程
  - AMD => require.js 第三方库
  - CMD => sea.js 第三方库
- Node.js 环境中对 JavaScript 进行了特殊的模块化支持：CommonJS

### package-lock.json 作用

- 锁定版本，保存 node_module 中安装包的信息（版本、下载地址）
- 提升下载速度
-----------------------------------------------------

# Node.js 第 5 天

## 8. MongoDB

### 关系型数据库和非关系型数据库

表就是关系，或者说表与表之间存在关系

- 所有的关系型数据库都需要通过 sql 语言操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 主键唯一
  - 默认值
  - 非空
- 非关系型数据库非常灵活
- 有的非关系型数据库是 key-value 对
- MongoDB 是长的最像关系型数据库的非关系型数据库
  - 数据库 -> 数据库
  - 数据表 -> 集合（数组）
  - 表记录 -> 文档对象
- MongoDB 不需要设计表结构，更灵活

### MongoDB 数据库基本概念

- 数据库（可以有多个）
- 集合（一个数据库中可以有多个集合，集合类似于关系型数据库中的表）
- 文档（一个集合可以有多个文档，文档结构灵活，无限制）
- MongoDB 非常灵活，不需要像 MySQL 一样县创建数据库、表、设计表结构
  - 当插入数据时，只需要指定往哪个数据库的哪个集合操作
  - 一切都由 MongoDB 来帮助你自动完成建库建表


### 下载和安装

参考：

[菜鸟教程Windows MongoDB](https://www.runoob.com/mongodb/mongodb-window-install.html)

[MongoDB官网](https://www.mongodb.com/)

- 下载
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- 安装
  - 选择 `custom` 自定义安装
  - 然后一直Next
  - 最后一步不要选择 Install MongoDB Compass，因为会特别慢（以亲身试验）
  - MongoDB Compass 是 MongoDB 的图形界面管理工具，可以单独下载安装，地址：https://www.mongodb.com/download-center/compass

### 启动和关闭数据库

> 启动

1. MongoDB将数据目录存储在 db 目录下，但是这个数据目录不会主动创建，需要在安装完成后手动创建。
数据目录默认放在安装 MongoDB 的磁盘根目录下。

```
磁盘根目录\data\db\
```

更改默认的数据存储目录

```
mangod --dbpath=数据存储目录路径
```

2. 双击 MongoDB 的 bin 文件夹下的 mangod.exe 启动数据库，双击 mango.exe 连接数据库

> 关闭

`ctrl + c` 或者 关闭命令行窗口（点右上角的 x）

### 连接和退出数据库

> 连接

双击 MongoDB 的 bin 文件夹下的 mango.exe 连接数据库

> 退出

```
# mango 控制台输入以下命令
exit
```

### 基本命令

```
# 查看显示所有的数据库
show dbs

# 查看当前操作的数据库
db

# 切换到指定的数据（如果没有会新建）
use 数据库名称

插入数据

```

### 在 Node 中操作 MongoDB 数据

使用 mongoose 第三方包，mongoose 基于官方的 MongoDB 包再一次做了封装。

> mongoose

[英文官网](https://mongoosejs.com/)

[中文官网](http://www.mongoosejs.net/)
 



 # Node.js 第 6 天


