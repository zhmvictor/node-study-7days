# Express - curd

## 起步

- 初始化
- 模板处理

## 路由设计

| 请求方法 | 请求路径 | get 参数 | post 参数 | 备注 |
 GET    /students                                         渲染首页
 GET    /students/new                                     渲染添加学生页面
 POST   /students/new      name、age、gender、hobbies      处理添加学生信息
 GET    /students/edit     id                             渲染编辑页面
 POST   /students/edit     id、name、age、gender、hobbies  处理编辑请求
 GET    /students/delete   id                             处理删除指定id学生  


## 总结

- 处理模板
- 配置开放静态资源
- 配置模板引擎
- 简单路由： /students 渲染静态页面出来
- 路由设计
- 提取路由模块
- 封装 student.js 处理数据
- student.js 文件结构
  - 查询所有学生列表 API find
  - findById
  - save
  - updateById
  - deleteById
- 实现具体功能
  - 通过路由接收请求
  - 接收请求中的数据（get、post）
    - req.body
    - req.query
  - 调用数据操作 API 处理数据
  - 根据操作结果给客户端发送响应
- 业务功能顺序
  - 列表
  - 添加
  - 编辑
  - 删除
