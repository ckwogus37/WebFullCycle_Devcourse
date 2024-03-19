function add1(x, y) {
    return x + y
}

let add2 = function(x,y){
    return x+y
}

// 화살표 함수 ("function"글자 대신 "=>"화살표 사용)
let add3 = (x,y) => {
    return x+y
}

// return 만 있다면 중괄호 생략 가능
const add4 = (x,y) => x+y

console.log(add1(1,2))
console.log(add2(1,2))
console.log(add3(1,2))
console.log(add4(1,2))