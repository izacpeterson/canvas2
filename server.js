import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ msg: "Hello, world!" });
});

app.listen(80, () => {
  console.log("App up");
});
