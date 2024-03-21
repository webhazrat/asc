import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    thumbnail: String,
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: String,
    feeDetail: String,
    location: String,
    date: Date,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
