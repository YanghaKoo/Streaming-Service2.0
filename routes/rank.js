const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer()
const conn = require('../config/db')();


// 평점 확인
// router.get('/',(req,res)=>{
//   let sql = "select * from rating"
//   conn.query(sql,(err,result)=>{
    
//     if(result[0]){
//     // 평균을 구하는 식
//     let sum = 0;
//     for(let i=0; i<result.length; i++){
//       sum += result[i].rating
//     }
//     let average = sum/result.length
//     res.send(`<h1>${average}</h1>`)
//     }else{
//       res.send('<h1>등록된 평점이 없습니다.</h1>')
//     }
//   })
// })

function getAvg(results){
  var number = 0
  for(var i in results){
    number += results[i].rating
  }
  if(results.length === 0){
    return 0
  }

  number =  number / results.length
  return number
}

router.get('/',(req,res)=>{
  var video1 =0 , video2 = 0, video3 =0  
  var sql = "select * from rating3 where id=?"
  conn.query(sql,"video1",function(err,results){
    video1 = getAvg(results)
    var sql = "select * from rating3 where id=?"
    conn.query(sql,"video2",function(err,results){
      video2 = getAvg(results)
      var sql = "select * from rating3 where id=?"
      conn.query(sql,"video3",function(err,results){
      video3 = getAvg(results) 
      
      var arr = [
          {name : "video1", value : video1},
          {name : "video2", value : video2},
          {name : "video3", value : video3}
        ]

      arr.sort(function(a,b){
        if(a.value > b.value){
          return -1
        }
        if(a.value < b.value){
          return 1
        }
        return 0
      })
      //res.render('rank.pug',{arr})      
      res.json(arr)
    })
    })    
  })    
})




// 평점 등록
router.post('/',upload.none(), (req,res)=>{
  // conn.query(sql,req.body.starinput, (err,result)=>{
  if(req.body.rating === '0'){
    res.json({'ret' : 'zeroFail'})
    return;
  }

  let sql = "insert into rating3(rating, id) values(?,?)"
  conn.query(sql,[Number(req.body.rating), req.body.id ], (err,result)=>{
    if(err) {
      console.log(err)
      res.json({'ret' : 'fail'})
    }
    res.json({'ret': 'success'})
  })  
})


module.exports = router