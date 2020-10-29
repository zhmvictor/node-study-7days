const users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'},
];

Array.prototype.myFind = (conditionFunc) => {
  for(let i = 0; i < this.length; i++) {
    if(conditionFunc(this[i], i)) {
      return this[i];
    }
  }
}


Array.prototype.myFindIndex = (conditionFunc) => {
  for(let i = 0; i < this.length; i++) {
    if(conditionFunc(this[i], i)) {
      return i;
    }
  }
}