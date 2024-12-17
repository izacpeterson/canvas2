import express from "express";
import districts from "./districs.js";
import schools from "./schools.js";
import auth from "./auth.js";
import faculty from "./faculty.js";

const router = express.Router();

router.use("/districts", districts);
router.use("/schools", schools);
router.use("/auth", auth);
router.use("/faculty", faculty);

export default router;
