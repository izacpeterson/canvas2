import express from "express";
import districts from "./districs.js";

const router = express.Router();

router.use("/districts", districts);

export default router;
