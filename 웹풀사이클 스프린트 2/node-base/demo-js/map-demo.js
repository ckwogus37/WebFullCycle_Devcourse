// map 함수 ( HTTP 프로토콜의 method가 아니다. )

// map vs forEach
// return에 차이가 있다!

const arr = [1,2,3,4,5]
const user = new Map()
user.set(1,"one")
user.set(2,"two")
user.set(3,"three")

const a = user.keys()
const b= user.values()
const c = user.entries()

console.log(a)
console.log(b)
console.log(c)


// const foreachArr = arr.forEach((a,b,c)=>{
//     return a * 2
// })
// console.log(arr)

// const mapArr = arr.map((a,b,c)=>{
//     return a * 2
// })
// console.log(arr)

// console.log(`forEach로 return하면 ${foreachArr},
//             map으로 return하면 ${mapArr}`)
            