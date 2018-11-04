const router = require('express').Router()
router.get('/',(req,res)=>{
  res.render('list')      // videourl 하고 videoId를 넘겨줘야함
})


module.exports =router