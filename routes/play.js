const express = require('express')
const router = express.Router()

// /play/회원id로 개인 채널 배정
// uniqueId로 url에서 받아와서 재생 시켜줌
router.get('/:uniqueId',(req,res)=>{  
  // const videoUrl = `http://stream.itsp.kr:1935/itspcamera2/${req.params.uniqueId}/manifest.mpd` 
  const videoUrl = `http://stream.itsp.kr:1935/itspcamera2/${req.params.uniqueId}/manifest.mpd` 
  res.render('play', {videoUrl})
})

module.exports = router