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

console.log([].mySlice.call(fakeArr));