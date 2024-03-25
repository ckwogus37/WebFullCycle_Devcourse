const obj1 = {

} 
const obj2 = {
    message : "내용물 있음!"
} 
const num = 1
const str1 = "one"
const str2 = "" //문자열도 객체다!

console.log(isEmpty(obj1)) // length === 0
console.log(isEmpty(obj2)) // length === 1

//console.log(Object.keys(num).length === 0) 
// => 숫자에서는 사용할 수없다!
// 그래서 객체가 비어있는지 확인하기 전에 객체인지 확인을 먼저하는게 좋다. 
// obj.constructor 라는 변수를 활용할 수 있다.
console.log(Object.keys(str1).length === 0) 
console.log(Object.keys(str2).length === 0) 

function isEmpty(obj){
    if(Object.keys(obj).length === 0){
        return true;
    }else{
        return false;
    }
}

