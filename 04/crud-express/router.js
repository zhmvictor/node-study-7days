/**
 * router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的 请求方法+请求路径 设置具体的请求处理函数
 */

// Express 包装路由的方式

const express = require('express');
// 用户API实例
const Student = require('./student');

// 1. 创建一个路由器
const router = express.Router();

// 2. 把路由挂载到 router 路由器容器

// 渲染首页
router.get('/students', (req, res) => {
  Student.find()
    .then(data => {
      res.render('index.html', {
        fruits: ['苹果', '香蕉', '橘子'],
        students: data,
      });
    })
    .catch(err => {
      res.status(500).send('Server error');
    });
});

// 渲染添加学生页面
router.get('/students/new', (req, res) => {
  res.render('new.html');
});

// 处理添加学生信息
router.post('/students/new', (req, res) => {
  /**
   * 1. 获取表单数据
   * 2. 处理
   * 3. 发送响应
   */
  Student.save(req.body)
    .then(data => {
      res.redirect('/students');
    })
    .catch(err => {
      res.status(500).send('Server error');
    });
});

// 渲染编辑页面
router.get('/students/edit', (req, res) => {
  /**
   * 1. 在客户端的列表页面中处理链接问题（需要有id参数）
   * 2. 获取要编辑的学生id
   * 3. 渲染编辑页面
   *    根据 id 把学生信息查出来
   *    使用模板引擎渲染页面
   */
  Student.findById(parseInt(req.query.id))
    .then(data => {
      res.render('edit.html', { 
        student: data
      });
    })
    .catch(err => {
      res.status(500).send('Server error');
    });
});

// 处理编辑请求
router.post('/students/edit', (req, res) => {
  /**
   * 1.处理表单数据
   * 2.更新
   * 3.发送响应
   */
  Student.updateById(req.body).then(data => {
    res.redirect('/students');
  }).catch(err => {
    res.status(500).send('Server error');
  });
});

// 处理删除指定id学生
router.get('/students/delete', (req, res) => {
  /**
   * 1. 获取要删除的id
   * 2. 根据id执行删除操作
   * 3. 根据操作结果发送响应数据
   */
  Student.deleteById(req.query.id).then(data => {
    res.redirect('/students');
  }).catch(err => {
    res.status(500).send('Server error');
  });
});

// 3. 导出 router
module.exports = router;
