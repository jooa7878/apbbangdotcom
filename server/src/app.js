const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static("../build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("server is running");
});
// 클라이언트에서 빌드하고 빌드 폴더를 서버에 옮김
// 우리의 첫 위치는 안폰빵닷컴폴더
// 클라이언트 폴더로 이동함
// 클라이언트는 node_modules가 없음 nopm ci
// npm run build
// 클라이언트 빌드 폴더 서버에 옮김

// 서버 폴더로 이동해서
// npm ci
// node add.js
// 이 부분을 컴퓨터가 알아서 하면 지속적인 배포 가능
