const router = require('express').Router()
router.get('/',(req,res)=>{
  res.render('list')     
})
module.exports = router