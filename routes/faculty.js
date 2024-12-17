import express from "express";
import DatabaseManager from "../db/db.js";
const router = express.Router();

router.get("/:email", async (req, res) => {
  const db = new DatabaseManager();
  const district = await db.getFacultyByEmail(req.params.email);

  res.send(district);
});

export default router;
