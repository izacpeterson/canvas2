import express from "express";
import DatabaseManager from "../db/db.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  const db = new DatabaseManager();
  const district = await db.getSchool(req.params.id);

  res.send(district);
});

export default router;
