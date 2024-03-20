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

app.use(express.json()) // '미들웨어' : json 설정
app.post('/youtubers',(req,res)=>{
    db.set(id++, req.body)
    const {channelTitle} = db.get(id-1)

    res.json({
        "message" : `${channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})

app.get('/youtubers', (req,res)=>{
    res.json(db)
})

// REST API 설계
app.get('/youtubers/:id',(req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let youtuber_inf = db.get(id);

    if(youtuber_inf == undefined){
        res.json({
            message : `유튜버 정보를 찾을 수 없어요`
        })
    }else{
        res.json(youtuber_inf)
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