const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected route - get logged in student profile
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;