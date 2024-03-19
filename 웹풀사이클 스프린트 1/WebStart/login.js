// var vs let vs const
function compareVarialbe(){
    // var는 더 이상 사용되지 않는다.
    let num1 = 10;
    const num2 = 30;

    // num1 = 20;
    // alert('num1 = ' + num1);

    // num2 = 40;
    // const 변수는 변수값 변경이 불가능하기에 오류처리되어 웹사이트 작동이 안됨.
    // alert('num2 = ' + num2);
}

// ID 란에 입력된 값을 팝업창에 띄우기
function popId() { 
    let userId = document.getElementById('txt_id').value;
    if(!userId){
        // = userId == ""
        alert('아이디를 입력해주세요.');
    }else{
        alert(userId);
    }
}

function myFunction() {
    alert('1');
    alert('2');
    alert('3');
}