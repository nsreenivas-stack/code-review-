const generateReview = require("../services/ai.service");
const Review = require("../models/review.model");

exports.getReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }
    const review = await generateReview(code);

    await Review.create({ code, language, review });

    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate review" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
