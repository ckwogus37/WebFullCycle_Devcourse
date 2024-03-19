if (true){

    // var는 함수레벨 스코프 이기에 함수 내부에서만 사용 가능
    var num0 = 15;

    // let과 const는 블록레벨 스코프이기에 {} 내부에서만 사용 가능하다.
    let num1 = 3;
    const num2 = 5;

    console.log(`템플릿문자열 출력하기 num1 = ${num1}, num2 = ${num2}`);
}

console.log(num0); // 정상 출력
// console.log(num1); // 출력 안됨
// console.log(num2); // 출력 안됨