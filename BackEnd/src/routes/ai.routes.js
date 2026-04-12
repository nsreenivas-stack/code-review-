const express = require("express");
const router = express.Router();

const { getReview, getHistory } = require("../controllers/ai.controller");

router.post("/review", getReview);
router.get("/history", getHistory);

module.exports = router;
