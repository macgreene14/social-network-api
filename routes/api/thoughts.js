const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "thoughts working" });
});

module.exports = router;
