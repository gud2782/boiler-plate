const express = require("express"); //express module 호출
const app = express();
const port = 5000;
const { User } = require("./models/User");
//application/x-www/form-urlencoded
app.use(express.urlencoded({ extended: true })); //express 4.x 버전부터는 express에 bodyParser가 내장됩니다.

//application/json
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://do:1234@cluster0.e91ss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.log("MongoDB error: ", e));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
