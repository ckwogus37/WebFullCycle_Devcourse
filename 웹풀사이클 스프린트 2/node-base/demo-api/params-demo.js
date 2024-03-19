const express = require('express');
const app = express();

app.listen(3000);

// 예시 유튜브 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 예시 벨로그 주소 : https://velog.io/@ckwogus37/posts

// app.get('/:nickname', function(req,res){
//     const param = req.params;

//     res.json({
//         가방이름 : param.nickname
//     })
// })

// 예시 유튜브 영상 주소 : https://www.youtube.com/watch?v=3tejmt47Hkw
// 예시 유튜브 영상 주소 : https://www.youtube.com/watch?v=3tejmt47Hkw&t=4060s
app.get('/watch', function(req,res){
    // 자바스크립트 객체의 비구조화
    const {v,t} = req.query
    console.log(v);
    console.log(t);

    res.json({
         영상코드 : q.v,
         타임라인 : q.t
    })
})
