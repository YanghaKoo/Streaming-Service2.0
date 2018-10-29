const express = require('express')
const router = express.Router()

// /play/회원id로 개인 채널 배정
// uniqueId로 url에서 받아와서 재생중이면 비디오 틀어줘야지
router.get('/:uniqueId',(req,res)=>{
  const videoUrl = "http://stream.itsp.kr:1935/itspcamera2/test1/manifest.mpd" //이건 dash, pug가서 type수정해야함
  //const videoUrl = "http://stream.itsp.kr:1935/itspcamera2/test1/playlist.m3u8"
  res.render('play', {videoUrl})
})

module.exports = router