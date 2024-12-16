import express from "express";
import DatabaseManager from "../db/db.js";
const router = express.Router();

router.get("/all", async (req, res) => {
  const db = new DatabaseManager();
  const districs = await db.getDistricts();

  res.send(districs);
});

router.get("/:id", async (req, res) => {
  const db = new DatabaseManager();
  const district = await db.getDistrict(req.params.id);

  res.send(district);
});

router.get("/schools/:id", async (req, res) => {
  const db = new DatabaseManager();
  const schools = await db.getSchoolsInDistrict(req.params.id);

  res.send(schools);
});

export default router;
