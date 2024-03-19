const express = require('express');
const app = express();
app.listen(3000);

// Map 형식은 DB의 table과 같이 key:value로 이루어져 있는 자료구조
let db = new Map()

let notebook = {
    productName : "Notebook",
    price : 2000000
}
let cup = {
    productName : "cup",
    price : 3000
}
let chair = {
    productName : "chair",
    price : 70000
}

let poster = {
    productName : "poster",
    price : 200000
}

// key:value 형식의 한 쌍으로 Map형식인 db 변수에 저장
db.set(1, notebook)
db.set(2, cup)
db.set(3, chair)
db.set(4, poster)

app.get("/:id_1", function(req,res){
    // 객체의 비구조화시에 객체의 key값으로 변수명을 사용하도록 하자.
    const {id_1} = req.params
    id = parseInt(id_1);

    if(db.get(id)==undefined){
        res.json({
            id : id,
            message : "없는 상품입니다. 죄송합니다."
        })
    }else{
        product = db.get(id)
        // json에 key:value값 추가하는 방법 (1번 2번 모두 같은 결과)
        // 1번 .(dot) 사용하기
        // product.id = id

        // 2번 [  ] 사용하기 (json은 모두 문자열과 숫자로 구성되어있기에 가능)
        // product["id"] = id
        
        // 위에서 상품별 객체 선언할 때 없던 id값이 추가되어 출력된다.
        product.id = id; 
        res.json(db.get(id))
    }
})