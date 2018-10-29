const router = require('express').Router()

/*
  회원가입된 테이블이 있으면 거기서 아이디를 받아와서 
  id에 넘기게

  *lvie streaming 주소 넘길 때
  <source src="http://192.168.35.45:1935/live/uniqueId/manifest.mpd" type="application/dash+xml"> 


*/

router.get('/',(req,res)=>{
  // 추후 회원ID에를 DB에서 가져올 수 있으면 회원 id로 videoID를 생성
  const videoId = ['uniqueId', 'uniqueId2']
  const videoUrl = ["http://192.168.1.147:1935/vod/mp4:sample.mp4/manifest.mpd",
                    "http://stream.itsp.kr:1935/itspcamera2/test1/manifest.mpd" ]
  const imgList = ['https://via.placeholder.com/300x150','https://via.placeholder.com/300x151']
  // const videoUrl = `http://172.16.48.209:1935/live/${videoId}/manifest.mpd`    // db 생기면
  
  res.render('list')      // videourl 하고 videoId를 넘겨줘야함
})


module.exports =router