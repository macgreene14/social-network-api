const { Schema, model, Types } = require("mongoose");

//define reaction schema, to be nested within thought schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.objectId(),
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, id: true }
);

// define thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  { toJSON: { virtuals: true }, id: false }
);

// create a virutal property 'friendCount'
thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

// initialize model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
