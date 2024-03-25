// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) // => req.body를 JSON 형식으로 읽을 수 있게 해주는 모듈

let db = new Map()
let accountNum = 1 // 하나의 객체를 유니크하게 구별하기 위함

let loginUser = {} 
// userInfo 선언 시, {} 로 초기화를 했는데 이것은 Null값이기에 undefined가 아님을 항상 주의해야 한다.
// id 값을 못 찾았을 경우의 if문에서는 Null값이라도 truthy 의미를 지니기에 if문이 바로 실행되기 때문
// checkDB 함수에서 사용하기 위해 로그인 app.post 내부의 변수를 전역변수로 수정

// 로그인
app.post('/login', (req,res)=>{
    const {id, password} = req.body
    
    checkDB(db,id)
    console.log(loginUser)
   
    if(isExist(loginUser)){ 
        console.log("아이디 같은거 찾았다!")

        // password도 맞는지 비교
        if(loginUser.password === password){
            console.log("패스워드도 같다!")
        }else{
            console.log("패스워드가 다르다!")
        }
    }else{
        console.log("입력하신 아이디는 없는 아이디 입니다.")
    }
})

// 입력받은 id와 pwd가 DB에 저장된 회원인지 확인해야 한다
function checkDB(db, id){
    db.forEach((user)=>{
        if(user.id === id){
            loginUser = user
        }
    })
}


// 객체 안에 데이터가 있는지 확인해주는 함수
function isExist(obj){
    if(Object.keys(obj).length){
        return true
    }else{
        return false
    }
}

// 회원가입
app.post('/join', (req,res)=>{
    const {id, password, name} = req.body
    if(id && password && name){
        //console.log(req.body)
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
    .get((req,res)=>{   // 회원 개별 조회
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
    .delete((req,res)=>{    // 회원 개별 탈퇴
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