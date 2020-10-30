const mongoose = require('mongoose');
// 连接 MangoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

/**
 * 创建一个模型
 * 设计数据库
 * MangoDB 是动态的，非常灵活，只需要在代码中设计数据库
 * mangoose 包可以让设计编写过程更简单
 */
const Cat = mongoose.model('Cat', { name: String });
// 实例化 Cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化存储 kitty 实例
kitty.save().then(() => console.log('meow')); 