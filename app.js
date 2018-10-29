require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors')

const indexRouter = require("./routes/index");
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

app.use("/", indexRouter);
app.use("/rank", rankRouter);
app.use("/play", playRouter);
app.use("/list", listRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(process.env.PORT + " port connected!");
});
