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

db.set(1, youtuber1)
db.set(2, youtuber2)
db.set(3, youtuber3)

// REST API 설계
app.get("/youtuber/:id", function(req,res){
    let {id} = req.params
    id = parseInt(id)

    let youtuber_inf = db.get(id);

    if(youtuber_inf == undefined){
        res.json({
            message : "Sorry... No Information about your youtuber nickname"
        })
    }else{
        res.json(youtuber_inf)
    }
})