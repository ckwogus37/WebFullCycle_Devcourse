// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) // => req.body를 JSON 형식으로 읽을 수 있게 해주는 모듈

let db = new Map()
let channelNum = 1 // 하나의 객체를 유니크하게 구별하기 위함

app
    .route('/channels')
    .get((req,res)=>{   // 채널 전체 조회
        if(db.size){
            let channels = []

            db.forEach((value, key)=>{
                channels.push(value)
            })
    
            res.status(200).json(channels) 
        }else{
            res.status(404).json({
                message : "조회할 채널이 없습니다."
            })
        }

    }) 
    .post((req,res)=>{  // 채널 개별 생성 = db에 저장
        if(req.body.channelTitle){
            db.set(channelNum++, req.body)

            res.status(201).json({
                message : `${db.get(channelNum-1).channelTitle} 채널을 응원합니다!`
            })
        }else{
            res.status(400).json({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    }) 
    
app    
    .route('/channels/:channelNum')
    .get((req,res)=>{   // 채널 개별 조회
        let {channelNum} = req.params
        channelNum = parseInt(channelNum)
        
        let channel = db.get(channelNum)
        if(channel){
            res.status(200).json(channel)
        }else{
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    }) 
    .put((req,res)=>{   // 채널 개별 수정
        let {channelNum} = req.params
        channelNum = parseInt(channelNum)

        let channel = db.get(channelNum)
        
        if(channel){
            let oldTitle = channel.channelTitle
            let newTitle = req.body.channelTitle

            channel.channelTitle = newTitle
            db.set(channelNum,channel)

            res.status(200).json({
                message : `채널명이 정상적으로 수정되었습니다. 기존 "${oldTitle}" -> 수정 "${newTitle}"`
            })
        }else{
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    }) 
    .delete((req,res)=>{    // 채널 개별 삭제
        let {channelNum} = req.params
        channelNum = parseInt(channelNum)
        
        let channel = db.get(channelNum)
        if(channel){
            db.delete(channelNum)
            res.status(200).json({
                message : `${channel.channelTitle} 채널이 정상적으로 삭제되었습니다.`
            })
        }else{
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    }) 
