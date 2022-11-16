const mongoose = require("mongoose");

// define user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: String,
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { toJSON: { virtuals: true }, id: true }
);

// create a virutal property 'friendCount'
userSchema.virtual("friendCount").get(function () {
  returnthis.thoughts.length;
});

// initialize model
const User = model("user", userSchema);

module.exports = User;
