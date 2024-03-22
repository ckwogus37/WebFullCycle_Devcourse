// express 모듈 셋팅
const express = require('express')
const { isNull } = require('util')
const app = express()
app.listen(7777)
app.use(express.json()) // => req.body를 JSON 형식으로 읽을 수 있게 해주는 모듈

let db = new Map()
let accountNum = 1


// 로그인
app.post('/login', (req,res)=>{
    const {id, pwd} = req.body

    if(id && pwd){
        res.status(201).json({
            "id" : `입력받은 id값 : ${id}`,
            "pwd" : `입력받은 pwd값 : ${pwd}`
        })
    }else{
        res.status(400).json({
            Message : "아이디 또는 비밀번호를 정확히 입력해주세요"
        })
    }
})

// 회원가입
app.post('/join', (req,res)=>{
    const {id, pwd, name} = req.body
    if(id && pwd && name){
        console.log(req.body)
        db.set(accountNum++, req.body)
        res.status(201).json({
            message : `${db.get(accountNum-1).name}님 환영합니다.`
        }) 
    }else{
        res.status(400).json({
            Message : `입력 값을 다시 확인해주세요`
        })
    }
})

// route()를 활용한 REST API 구조 변경
app.route('/users/:accountNum')
    .get((req,res)=>{
        let {accountNum} = req.params  
        accountNum = parseInt(accountNum)
        const user = db.get(accountNum)
    
        if(user == undefined){
            res.status(404).json({
                message : `계정번호 ${accountNum}번으로 등록된 유저는 존재하지 않습니다.`
            })
        }else{
            res.status(200).json({
                id : user.id,
                name : user.name
            })
        }
    })
    .delete((req,res)=>{
        let {accountNum} = req.params  
        accountNum = parseInt(accountNum)
        const user = db.get(accountNum)
    
        if(user == undefined){
            res.status(404).json({
                message : `계정번호 ${accountNum}번으로 등록된 유저는 존재하지 않습니다.`
            })
        }else{
            db.delete(accountNum)
            res.status(200).json({
                message : `${user.name}님 다음에 또 뵙겠습니다.`
            })
        }
    })

// ⬆️⬆️⬆️  route를 활용하여 REST API의 구조를 변경한 방법  ⬆️⬆️⬆️
// ⬇️⬇️⬇️       기존에 사용했던 REST API 설계방법        ⬇️⬇️⬇️

// // 회원 개별 조회
// app.get('/users/:accountNum', (req,res)=>{
//     let {accountNum} = req.params  
//     accountNum = parseInt(accountNum)
//     const user = db.get(accountNum)

//     if(user == undefined){
//         res.status(404).json({
//             message : `계정번호 ${accountNum}번으로 등록된 유저는 존재하지 않습니다.`
//         })
//     }else{
//         res.status(200).json({
//             id : user.id,
//             name : user.name
//         })
//     }
// })

// // 회원 개별 탈퇴
// app.delete('/users/:accountNum', (req,res)=>{
//     let {accountNum} = req.params  
//     accountNum = parseInt(accountNum)
//     const user = db.get(accountNum)

//     if(user == undefined){
//         res.status(404).json({
//             message : `계정번호 ${accountNum}번으로 등록된 유저는 존재하지 않습니다.`
//         })
//     }else{
//         db.delete(accountNum)
//         res.status(200).json({
//             message : `${user.name}님 다음에 또 뵙겠습니다.`
//         })
//     }
// })