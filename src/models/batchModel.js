import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    passingYear: { type: Number, required: true },
    examineeNumber: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Batch || mongoose.model("Batch", batchSchema);
