import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: "General" },
    photo: String,
    password: String,
    address: String,
    education: String,
    institute: String,
    status: {
      type: String,
      required: true,
      enum: ["Verified", "Unverified"],
      default: "Unverified",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
