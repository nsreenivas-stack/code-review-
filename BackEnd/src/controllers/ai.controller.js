const generateReview = require("../services/ai.service");

exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }
    const review = await generateReview(code);
    res.json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate review" });
  }
};
