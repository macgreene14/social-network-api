const router = require("express").Router();
const User = require("../../models/Users");

router.get("/", (req, res) => {
  // find all users in db
  return res.status(200).json({ message: "thoughts working" });
});

router.get("/:id", (req, res) => {
  // find user by id in db
  const id = req.params.id;
  return res.status(200).json({ message: "thoughts working" });
});

router.post("/", (req, res) => {
  // add users to db
  const un = req.body.username;
  const pw = req.body.password;
  return res.status(200).json({ message: "thoughts working" });
});

router.post("/:id/friends/:idFriend", (req, res) => {
  // add users to db
  const id = req.params.id;
  const idFriend = req.params.idFriend;

  return res.status(200).json({ message: "thoughts working" });
});

router.delete("/:id/friends/:idFriend", (req, res) => {
  // add users to db
  const id = req.params.id;
  const idFriend = req.params.idFriend;

  return res.status(200).json({ message: "thoughts working" });
});

router.put("/:id", (req, res) => {
  // update users in db
  const id = req.params.id;
  return res.status(200).json({ message: "thoughts working" });
});

router.delete("/:id", (req, res) => {
  // delete users from db
  const id = req.params.id;
  return res.status(200).json({ message: "thoughts working" });
});

module.exports = router;
