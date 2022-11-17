const router = require("express").Router();
const Thought = require("../../models/Thoughts");

router.get("/", async (req, res) => {
  // find thoughts in db
  try {
    const document = await Thought.find();
    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  // find thought by id in db
  try {
    const id = req.params.id;
    const document = await Thought.findOne({ _id: id });
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  // add thoughts to db
  const thoughtText = req.body.thoughtText;
  const user = req.body.username;
  try {
    const document = await Thought.create({
      thoughtText: thoughtText,
      username: user,
    });
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  // update thoughts in db
  try {
    const id = req.params.id;
    const thoughtText = req.body.thoughtText;
    const user = req.body.username;

    const document = await Thought.findOneAndUpdate(
      { _id: id },
      { thoughtText: thoughtText, username: user },
      { new: true }
    );
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete thoughts from db
  try {
    const id = req.params.id;
    const document = await Thought.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "thought deleted", document: document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

// Reaction nested document routes

router.post("/:id/reactions", async (req, res) => {
  // add thoughts to db
  const id = req.params.id;
  const reaction = req.body.reaction;
  try {
    const document = await Thought.findOneAndUpdate(
      { _id: id },
      { reactions: { $push: reaction } },
      { new: true }
    );
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id/reactions/:idReaction", async (req, res) => {
  // add thoughts to db
  const id = req.params.id;
  const idReaction = req.params.idReaction;
  try {
    const document = await Thought.findOneAndUpdate(
      { _id: id },
      { reactions: { $pull: idReaction } },
      { new: true }
    );
    return res.status(200).json({ document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
