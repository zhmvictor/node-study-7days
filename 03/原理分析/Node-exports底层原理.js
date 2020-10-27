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
