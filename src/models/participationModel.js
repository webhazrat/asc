import mongoose from "mongoose";

const participationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    passingYear: String,
    fees: [
      {
        _id: false,
        category: String,
        amount: Number,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Participation ||
  mongoose.model("Participation", participationSchema);
