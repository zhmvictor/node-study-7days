## 业务需求，实现逻辑

1. /  index.html
2. 开放 publice 目录中的静态资源。当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
3. /post  post.html
4. /pinglun
    1. 接收表单提交数据
    2. 存储表单提交数据
    3. 表单重定向到 / : statusCode、setHeader