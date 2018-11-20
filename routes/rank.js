const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer()
const conn = require('../config/db')();

// 평점 평균을 구하는 함수
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

// ajax 요청을 받을 랭킹 현황을 return 시켜줌
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




// 평점 등록 RESTful
router.post('/',upload.none(), (req,res)=>{
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