// express 모듈 설정
const express = require('express')
const app = express()

app.listen(3000)

// 데이터 설정
const youtuber1={
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

const youtuber2={
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

const youtuber3={
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}

// Map 객체 활용
let db = new Map()

let id = 1;

db.set(id++,youtuber1)
db.set(id++,youtuber2)
db.set(id++,youtuber3)

// 등록되어있는 전체 유튜버 조회 REST API 설계
app.get('/youtubers', (req,res)=>{
    if(db.size !== 0){ // Map객체의 경우 안에 값이 없을 때, Null값이 되지 undefined가 되지 않는다.
        let youtubers = {} // 각 유튜버의 정보들을 담을 객체 선언
        db.forEach((value, key)=>{ // Map객체에 들어있는 값들을 하나씩 확인
            youtubers[key] = value
        })
        res.json(youtubers);
    }else{
        res.status(404).json({
            message : "조회할 유튜버가 없습니다."
        })
    }
})

// 유튜버 개별 조회 REST API 설계
app.get('/youtubers/:id',(req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let youtuber_inf = db.get(id);

    if(youtuber_inf == undefined){
        res.status(404).json({
            message : `유튜버 정보를 찾을 수 없어요`
        })
    }else{
        res.json(youtuber_inf)
    }
})

// '미들웨어' : json 설정 => req.body를 JSON 형식으로 읽을 수 있게 해주는 모듈
app.use(express.json()) 
// 새로운 유튜버 등록 REST API 설계
app.post('/youtubers',(req,res)=>{
    const channelTitle = req.body.channelTitle    

    if(channelTitle){
        db.set(id++, req.body)
        res.status(201).json({
            "message" : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
        })
    }else{
        res.status(400).json({
            message : "요청 값을 제대로 보내주세요"
        })
    }

})

// 기존 유튜버 삭제 REST API 설계
app.delete('/youtubers/:id',(req,res)=>{
    let{id} = req.params
    id = parseInt(id)

    let youtuber_inf = db.get(id)
    if(youtuber_inf==undefined){
        res.status(404).json({
            "message" : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }else{
        let {channelTitle} = youtuber_inf
        db.delete(id)

        res.json({
            "message" : `${channelTitle}님, 아쉽지만 다음에 뵙겠습니다.`
        })
    }
    
})

// 전체 유튜버 삭제 REST API 설계
app.delete('/youtubers',(req,res)=>{

    //현재 둥록된 유튜버 현황 확인 필요
    // db에 값이 1개 이상이면, 전체 삭제
    if(db.size >= 1){ 
        db.clear()
        res.json({
            message : "전체 유튜버가 삭제되었습니다."
        })
    }else{ 
        res.status(404).json({
            message : "삭제할 유튜버가 없습니다."
        })
    }

})

// 개별 유튜버 정보 수정 REST API 설계
app.put('/youtubers/:id',(req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let msg = ""
    let youtuber_inf = db.get(id)

	// 예외처리
    if(youtuber_inf == undefined){
        res.status(404).json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }else{ 
        const oldTitle = youtuber_inf.channelTitle
        
        // HTTP BODY를 통해 수정할 값 받아오기
        const newTitle = req.body.channelTitle

        youtuber_inf.channelTitle = newTitle
        db.set(id,youtuber_inf)

        res.status(404).json({
            message : `${oldTitle}님 채널명이 ${newTitle}로 수정되었습니다.`
        }) 
    }
})


// 처음에 내가 한번 만들어본 코드 ====================================
// usableId = 1; //전역변수 선언
//
// // 유튜버를 등록할때마다 전역변수를 증가시켜주는 함수 선언
// function idCheck(id){
//     if(db.get(id)==undefined){
//         return id;
//     }else{
//         return usableId += 1;
//     }
// }

// db.set(idCheck(usableId), youtuber1)
// db.set(idCheck(usableId), youtuber2)
// db.set(idCheck(usableId), youtuber3)

// app.use(express.json()) // '미들웨어' : json 설정
// app.post("/youtuber", (req,res)=>{
    
//     db.set(idCheck(usableId), req.body)
//     const {channelTitle} = db.get(usableId)

//     res.json({
//         "message" : `${channelTitle}님, 유튜버 생활을 응원합니다!`
//     })
//     console.log(usableId)
// })

// // REST API 설계
// app.get("/youtuber/:id", function(req,res){
//     let {id} = req.params
//     id = parseInt(id)

//     let youtuber_inf = db.get(id);

//     if(youtuber_inf == undefined){
//         res.json({
//             message : `유튜버 정보를 찾을 수 없어요`
//         })
//     }else{
//         res.json(youtuber_inf)
//     }
// })