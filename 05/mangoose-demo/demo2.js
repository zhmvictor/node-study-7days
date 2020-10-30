const mongoose = require('mongoose');
// 架构模式
const { Schema } = mongoose;

/**
 * 1. 连接数据库
 * 指定连接的数据库不需要存在，当你插入第一条数据时，数据库就会自动被创建
 */ 
mongoose.connect('mongoose://localhost/itcast', { useNewUrlParser: true });

/**
 * 2. 设计集合结构（表结构）
 * 定义 Schema 模式，
 * 字段名称就是表结构中的属性名称
 * 值
 * 设计表时会有约束限制，约束的目的是为了保证数据的完整性，不要有脏数据
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
});

/**
 * 3. 将文档发布为模型
 * mongoose.model 方法用来将一个架构发布为 model
 * 第一个参数：首字母大写的单数字符串，用来表示数据库的名称。
 *            mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
 * 第二个参数：架构 Schema
 * 
 * 返回值：模型构造函数（类）
 * 
 */
const User = mongoose.model('User', userSchema);

/**
 * 4. 当有了模型构造函数之后，就可以用这个构造函数对 users 集合中的数据为所欲为了
 */
const admin = new User({
  username: 'admin',
  password: '123456',
  email: 'admin@admin.com',
});

// 持久化
admin.save((err, res) => {
  if(err) {
    console.log('保存失败：\n' + err);
    return;
  }
  console.log('保存成功：\n' + res);
});
// .then(res => {
//   console.log('保存成功：\n' + res);
// }).catch(err => {
//   console.log('保存失败：\n' + err);
// });

