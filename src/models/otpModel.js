import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String, required: true, expires: "5m" },
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
