// Promise 是一个构造函数，用于解决 callback 回调地狱（callback 嵌套 callback，禁止套娃）
// Promise 中文译为 “承诺” -- I promise you
// Promise 容器本身不是异步，内部封装的异步方法。
// Promise 容器一旦创建，就开始执行里面的代码

// console.log(1);
// const promise = new Promise((resolve, reject) => {
//   console.log(2);
//   setTimeout(() => {
//     resolve(true);
//     console.log(4);
//   }, 0);
// });
// console.log(3);


new Promise((resolve, reject) => {
  resolve(1);
  console.log(0);
}).then(data => {
  console.log(data);
  return data + 1;
}).then(data1 => {
  console.log(data1)
});;