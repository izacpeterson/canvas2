import express from "express";
import districts from "./districs.js";
import schools from "./schools.js";

const router = express.Router();

router.use("/districts", districts);
router.use("/schools", schools);

export default router;
