// express 모듈 셋팅
const express = require('express')
const router = express.Router();

router.use(express.json())
// expres.json() : req.body를 JSON 형식으로 읽을 수 있게 해주는 모듈

let db = new Map()
let channelNum = 1 // 하나의 객체를 유니크하게 구별하기 위함

router
    .route('/')
    .get((req,res)=>{   // 채널 전체 조회

        // 예외 처리 2가지
        // 1) id가 BODY에 없는 경우 -> 로그인을 하라고 알림
        // 2) id가 가진 채널이 없는 경우

        let {id} = req.body
        let channels = []

        if(db.size && id){ // 1) 예외처리 해결
            db.forEach((value, key)=>{
                if(id === value.id)
                    channels.push(value)
            })

            if(channels.length){ // 2) 예외처리 해결
                res.status(200).json(channels) 
            }else{
                notFoundChannel()
            }
        }else{
            notFoundChannel()
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
    
router    
    .route('/:channelNum')
    .get((req,res)=>{   // 채널 개별 조회
        let {channelNum} = req.params
        channelNum = parseInt(channelNum)
        
        let channel = db.get(channelNum)
        if(channel){
            res.status(200).json(channel)
        }else{
            notFoundChannel()
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
                message : `채널명이 정상적으로 수정되었습니다. 기존 : ${oldTitle}" -> 수정 : ${newTitle}`
            })
        }else{
            notFoundChannel()
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
            notFoundChannel()
        }
    }) 

function notFoundChannel(){
    res.status(404).json({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router
