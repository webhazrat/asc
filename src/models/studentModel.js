import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    role: { type: [String], default: ["General"] },
    avatar: String,
    password: String,
    bloodGroup: String,
    presentAddress: String,
    permanentAddress: String,
    dob: Date,
    passingYear: String,
    qualification: String,
    institute: String,
    professionalInstitute: String,
    designation: String,
    status: {
      type: String,
      required: true,
      default: "Unverified",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
