const express = require('express');
const app = express();

app.listen(3000);

// ------ 그렇다면 다른 API를 실습해보도록 하자 ------

// 실습 1
// method : "GET", 요청하는 데이터의 주소 "http://localhost:3000/test"
// 원하는 응답값 : "TEST SUCCESS"
app.get('/test', function(req,res){
    res.send('TEST SUCCESS!');
})

// 실습 2
// method : "GET", 요청하는 데이터의 주소 "http://localhost:3000/test/1"
// 원하는 응답값 : "ONE!"
app.get('/test/1', function(req,res){
    res.send('ONE!');
})

