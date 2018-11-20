require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors')


const rankRouter = require("./routes/rank");
const playRouter = require("./routes/play");
const listRouter = require("./routes/list");

// template 엔진 설정(pug)
app.set("view engine", "pug");
app.set("views", "views"); 

// 기본 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors())

app.use("/rank", rankRouter);
app.use("/play", playRouter);
app.use("/list", listRouter);

// main page 접속시 /list url로 이동
app.get('/', (req,res)=>{
  res.redirect('/list')
})

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
  console.log(port + " port connected!");
});
