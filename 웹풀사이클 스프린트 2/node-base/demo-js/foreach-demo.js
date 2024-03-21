const arr = [1,2,3,4,5]

// 배열(또는 객체)에서 요소를 하나 꺼낸 다음
// 매개변수에 그 요소를 전달하여 호출되는 콜백함수
arr.forEach((a,b,c)=>{
         // value, index, 배열 전체값
    console.log(`a : ${a}, b : ${b}, c : ${c}`)
})

// Map(객체)과 forEach의 만남
let map = new Map();
map.set(7,'seven')
map.set(9,'nine')
map.set(8,'eight')

arr.forEach((a,b,c)=>{
        // value, key, 객체 전체값
    console.log(`a : ${a}, b : ${b}, c : ${c}`)
})