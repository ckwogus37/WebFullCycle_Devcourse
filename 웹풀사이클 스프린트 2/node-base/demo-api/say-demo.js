const express = require('express');
const app = express();
app.listen(3000);

// 실습 3
// method : "GET", 요청하는 데이터의 주소 : /hello
// 응답값 : "안녕하세요"
app.get('/hello', function(req,res){
    res.send('안녕하세요');
})
// 이런 express의 코드는
// ['GET' method로, '/hello'가 날라오면
//  매개변수로 전달받은 콜백함수 function을 호출하겠어 ] => 이거를 서버에 세팅하는 코드