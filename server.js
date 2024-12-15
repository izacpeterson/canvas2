import express from "express";
import { DatabaseManager } from "./db/db.js";

const app = express();

app.get("/", async (req, res) => {
  let db = new DatabaseManager();
  let me = await db.getStudentById("988f8451-a3d2-4011-9769-fb52c68f1457");

  res.send(me);
});

app.listen(80, () => {
  console.log("App up");
});
