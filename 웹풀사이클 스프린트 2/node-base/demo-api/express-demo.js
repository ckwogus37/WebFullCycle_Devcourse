const express = require('express');
const app = express();
app.listen(3000);

// 여기서 API를 생각해보도록 하자
// method : "GET" , 요청사항 " / "
app.get('/',function(req, res){
    res.send('Hello express.js')
})

// 책의 정보를 담은 객체를 선언
let nodejsBook = {
	title : "Node.js를 공부해보자",
	price : 20000,
	description : "김송아가 지음"
}

//send 대신 json함수를 사용하여 매개변수로 객체명을 넣어준다.
app.get('/products/1', function(req,res){
    res.send(nodejsBook);
})

//물론 json형식을 그대로 입력해서 보내는 것도 가능하다!
app.get('/products/test', function(req,res){
	res.json({
		title : "Node.js를 공부해보자",
		price : 20000,
		description : "김송아가 지음"
	});
})
