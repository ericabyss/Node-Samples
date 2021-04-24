/**
 * Events 다루기
 */

// Readline 모듈
const readline = require('readline');

// Realine 모듈의 Interface 객체
const rl = readline.createInterface({
   input: process.stdin, //입력(터미널)
   output: process.stdout //출력(콘솔,터미널)
});

rl.once('line', input => {
   console.log('once(line) Event:', input);
});

rl.addListener('line', input => {
   console.log('addListener(line) Event:', input);
});

rl.on('line', input => { //엔터 이벤트
   console.log('on(line) Event:', input);
});


/* 에러
class MyClass{
}
const obj = new MyClass();
obj.on('line', (input) => {
   console.log('My Class 이벤트', input);
});*/