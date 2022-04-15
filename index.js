// 实现函数 call apply bind new

// call方法  将函数的this绑定到第一个参数对象上，并且调用
// myCall
Function.prototype.myCall = function (obj, ...args) {
  // 防止输入非对象报错
  obj = obj || window;
  obj = Object(obj);
  // 给obj加了这个方法，调用后删除
  obj.func = this;
  let ret = obj.func(...args);
  delete obj.func;
  // 返回结果
  return ret;
}

// myApply
Function.prototype.myApply = function (obj, arg) {
  // 防止输入非对象报错
  obj = obj || window;
  obj = Object(obj);  
  // 给obj加了这个方法，调用后删除
  obj.func = this;
  let ret = obj.func(...arg);
  delete obj.func;
  // 返回结果
  return ret;
}

// bind 改变函数的this的指向，绑定到第一个对象参数上，后面的参数
// myBind
Function.prototype.myBind = function (obj, ...args) {
  // 防止输入非对象报错
  obj = obj || window;
  obj = Object(obj);  

  obj.func = this;
  let arg1 = [...args];
  return function (...args) {
    let arg2 = [...args];
    let argsum = arg1.concat(arg2);

    let ret = obj.func(...argsum);
    delete obj.func;
    return ret;  
  }
}


// new 创建对象并连接原型，this指向新对象 执行构造函数的代码，并返回这个对象

// 创建空对象
// this指向新对象， 执行构造函数
// 设置原型链，新对象原型设置为构造函数的原型
// 返回对象

// myNew       函数参数第一个是构造函数，后面跟参数
function myNew(con, ...args) {
  let obj = {};
  let constructor = con;   
  obj.__proto__ = constructor.prototype;
  let ret = constructor.call(obj, ...args);
  if (typeof ret == "object") { //如果构造函数返回对象就赋它
    return ret;
  }
  else { //如果构造函数没返回对象，就返回obj
    return obj;
  }

}

//////////////////////////////

let foo = {
  value: 1
};

function bar(a,b,c,d) {
  console.log(this.value);
  console.log(a, b, c, d, a + d + this.value);
  return a + b;
}

let res = bar.call("foo",1,2,3,4);
// console.log(res);



let myres = bar.myCall(foo, 1, 2, 3, 4);
console.log(myres);

bar.myApply(foo, [1, 2, 3, 4]);



let as = bar.bind(foo, 1, 2, 3, 4);
let sa = bar.myBind(foo, 1, 2, 3, 100);

console.log(typeof as)
console.log(typeof sa)


function People(name,age) {
  this.name = name;
  this.age = age;
}

let people1 = myNew(People, "alex", 19);
console.log(people1);


class Person {

}

let p1 = new Person();
console.log(p1);


