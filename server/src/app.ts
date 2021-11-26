import express from "express";

const app = express();
app.use(express.static("build"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("server is running!");
});
