import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use("/api", routes);

app.get("/", async (req, res) => {
  res.send({});
});

app.listen(80, () => {
  console.log("App up");
});
