/**
 * router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的 请求方法+请求路径 设置具体的请求处理函数
 */

// Express 包装路由的方式
const dbData = require('./db.json');
const express = require('express');

// 1. 创建一个路由器
const router = express.Router();

// 2. 把路由挂载到 router 路由器容器
router.get('/students', (req, res) => {
  res.render('index.html', {
    fruits: ['苹果', '香蕉', '橘子'],
    students: dbData.students,
  });
});

router.get('/students/new', (req, res) => {
  res.render('new.html');
});

router.post('/students/new', (req, res) => {
  /**
   * 1. 获取表单数据
   * 2. 处理
   * 3. 发送响应
   */
  let student = req.body;
  student.id = dbData.students.length + 1;
  dbData.students.push(student);
  res.redirect('/students');
});

router.get('/students/edit ', (req, res) => {

});

router.post('/students/edit', (req, res) => {

});

router.get('/students/delete', (req, res) => {

});

// 3. 导出 router
module.exports = router;