// 자바스크립트 배열의 비구조화
const array = [1,2,3,4,5]
// 배열은 인덱스 값이 있어서 무조건 0번 인덱스부터 순서대로 저장된다.
const [num2, num3, num5] = array

console.log(num2) // 1출력
console.log(num3) // 2출력
console.log(num5) // 3출력

// 그렇다면 배열의 값중에 받고싶은 걸 받으려면 어떻게해야할까?
// 현재 위에서는 2,3,5번째 값을 받고싶지만 1,2,3번째만 받고있다.
// 바로 배열과 받을 변수의 순서를 맞춰주면 된다.

const [ , n2, n3, ,n5] = array
console.log(n2) // 2출력
console.log(n3) // 3출력
console.log(n5) // 5출력

