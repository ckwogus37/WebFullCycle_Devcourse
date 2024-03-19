const express = require('express');
const app = express();

app.listen(3000);

// 예시 유튜브 주소 : https://www.youtube.com/@15ya.fullmoon
// 예시 유튜브 주소 : https://www.youtube.com/@ChimChakMan_Official
// 예시 유튜브 주소 : https://www.youtube.com/@TEO_universe

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

app.get('/:nickname', function(req,res){
    const {nickname} = req.params;

    if(nickname == "@15ya.fullmoon"){
        res.json(youtuber1)
    }else if(nickname == "@ChimChakMan_Official"){
        res.json(youtuber2)
    }else if(nickname == "TEO_universe"){
        res.json(youtuber3)
    }else{ // 예외가 발생할 수 있으니 "예외처리"를 해준다. = 개발자가 예상하지 못한 상황
        res.json({
            message : "우리가 모르는 유튜버입니다..죄송합니다!"
        })
    }
})

