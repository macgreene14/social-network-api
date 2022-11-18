const router = require("express").Router();
const User = require("../../models/Users");
const { Schema, model, Types } = require("mongoose");

router.get("/", async (req, res) => {
  // find all users in db
  try {
    const document = await User.find()
      .populate({ path: "thoughts" })
      .populate({ path: "friends" });
    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  // find user by id in db
  try {
    const id = req.params.id;
    const document = await User.findOne({ _id: id });
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  // add new users to db
  const user = req.body.username;
  const email = req.body.email;
  try {
    const document = await User.create({ username: user, email: email });
    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  // update users in db
  try {
    const id = req.params.id;
    const user = req.body.username;
    const email = req.body.email;
    const document = await User.findOneAndUpdate(
      { _id: id },
      { username: user, email: email },
      { new: true }
    );
    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete users from db
  try {
    const id = req.params.id;
    const document = await User.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "user deleted", document: document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

// Friend Subdoc Routes

router.post("/:id/friends/:idFriend", async (req, res) => {
  // add friends to db
  try {
    const id = req.params.id;
    const idFriend = req.params.idFriend;

    const document = await User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { friends: idFriend } },
      { new: true }
    );

    return res.status(200).json({ document });
  } catch {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id/friends/:idFriend", async (req, res) => {
  // remove friends to db
  try {
    const id = req.params.id;
    const idFriend = req.params.idFriend;

    const document = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { friends: idFriend } },
      { new: true }
    );

    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

// Thought Subdoc Routes

router.post("/:id/thoughts/:idThought", async (req, res) => {
  // add thoughts to db
  try {
    const id = req.params.id;
    const idThought = req.params.idThought;

    const document = await User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { thoughts: idThought } },
      { new: true }
    );

    return res.status(200).json({ document });
  } catch {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id/thoughts/:idThought", async (req, res) => {
  // remove thoughts to db
  try {
    const id = req.params.id;
    const idThought = req.params.idThought;

    const document = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { thoughts: idThought } },
      { new: true }
    );

    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
