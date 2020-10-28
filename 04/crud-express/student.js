/**
 * student.js API
 *
 * 数据操作文件模块，封装异步编程
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.json');

/**
 * 获取所有学生列表
 * 因为readFile方法是异步的
 * 所以封装一层Promise
 * 成功：成功的数组
 * 错误：err错误对象
 */
exports.find = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data).students);
    });
  });
};

/**
 * 根据id查询用户对象
 * @param { Number } id
 */
exports.findById = id => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const students = JSON.parse(data).students;
      let findStu = students.find(item => item.id === id);
      if (findStu) {
        resolve(findStu);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * 添加保存学生
 * 修改文件，达到数据持久化
 */
exports.save = student => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      // 得到请求结果
      const students = JSON.parse(data).students;
      // 处理id
      student.id = students.length + 1;
      // 把新增用户保存到用户数组中
      students.push(student);
      // 把对象数据转换为字符串
      const fileData = JSON.stringify({ students });
      // 把新的字符串保存到文件中
      fs.writeFile(dbPath, fileData, err => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  });
};

/**
 * 更新学生
 */
exports.updateById = student => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const students = JSON.parse(data).students;
      // 把id改为统一的Int形式
      student.id = parseInt(student.id);
      // 根据 id 找到需要修改的数据
      let findStu = students.find(item => item.id === student.id);
      if (findStu) {
        for (let [key, value] of Object.entries(student)) {
          findStu[key] = value;
        }
        // 把对象数据转换为字符串
        const fileData = JSON.stringify({ students });
        // 把新的字符串保存到文件中
        fs.writeFile(dbPath, fileData, err => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
};

/**
 * 删除学生
 */
exports.deleteById = id => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const students = JSON.parse(data).students;
      let findStuIndex = students.findIndex(item => item.id === parseInt(id));
      if (findStuIndex !== -1) {
        students.splice(findStuIndex, 1);
        // 把对象数据转换为字符串
        const fileData = JSON.stringify({ students });
        // 把新的字符串保存到文件中
        fs.writeFile(dbPath, fileData, err => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
};
