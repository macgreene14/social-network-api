const { Schema, model, Types } = require("mongoose");

// define user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email.",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { toJSON: { virtuals: true }, id: true }
);

// create a virutal property 'friendCount'
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// initialize model
const User = model("user", userSchema);

module.exports = User;
