const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", SubscriberSchema);
