const express = require('express');
const app = express();

// 서버 셋팅 : 포트 번호 3000으로 셋팅
app.listen(3000);

const fruits = [
	{id : 1, namd : 'apple'},
	{id : 2, namd : 'orange'},
	{id : 3, namd : 'strawberry'},
	{id : 4, namd : 'blueberry'}
]

// 과일 전체 조회
app.get('/fruits', (req,res)=>{
	if(fruits){
		res.json(fruits) // JSON array
		// JSON array의 경우 JSON들의 배열이기에 바로 출력이 가능하다
	}else{
		res.json({
			message : "과일이 없습니다."
		})
	}
})

// 과일 개별 조회
app.get('/fruits/:id', (req,res)=>{
	let id = parseInt(req.params.id)
	// let fruit = frutis[id-1]
	
	let findFruit = fruits.find(f => (f.id == id)) 
	// find()는 JS의 배열에서 사용할 수 있는 함수
	// fruits 배열 안에 있는 객체 중, id값이 params.id랑 같은 객체를 반환하겠다.

	if(findFruit){
		res.json(findFruit)
	}else{ 
		// 예외를 터뜨린다. 
		// 예외가 없다면 프론트엔드에서는 정보를 받지 못하고 백엔드는 그저 아무것도 안하는 것이다.
		// 서버는 작동되고 있기에 "성공"코드가 전달된다.
		res.status(404).send( // HTTP 상태코드를 "실패"로 전달해준다.
			`전달해주신 id값 ${id}에는 저장된 과일이 없습니다.`
		)
	}
})