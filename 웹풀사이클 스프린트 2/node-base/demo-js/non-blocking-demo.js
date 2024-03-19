// 논블로킹 : 이전 작업이 완료될 때 까지 기다리지 않고,
//          다음작업이 바로 진행될 수 있도록 동작하는 패러다임이다.

// 비동기(ASynchronous) : 호출된 작업의 리턴 시간과 결과를 반환하는 시간이 같지 않은 경우

// 논블로킹은 말그대로 이전 작업이 끝날때까지 다른 작업들은 기다려야하는 거고
// 비동기는 여러 작업들이 동시에 진행될 수 있는 것을 의미한다.
// 논블로킹과 비동기는 다른 종류의 의미를 내포하는 단어이다.



function first(){
    console.log("first");
}
function second(){
    console.log("second");
}
function third(){
    console.log("third");
}

first();
setTimeout(second, 3000);
third();