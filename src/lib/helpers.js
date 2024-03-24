import { unlink, access } from "fs/promises";
import crypto from "crypto";

// generate and otp
export const generateOTP = () => {
  const max = 999999;
  const min = 100000;
  const otp = Math.floor(crypto.randomInt(max - min + 1) + min).toString();
  return otp;
};

// unique file name generate
export const generateFilename = (originalFilename) => {
  const ext = originalFilename.split(".").pop();
  const uniqueIdentifier = crypto.randomBytes(16).toString("hex");
  const newFilename = `${uniqueIdentifier}.${ext}`;
  return newFilename;
};

// unlink a file
export const deleteFile = async (filePath) => {
  try {
    await access(filePath);
    await unlink(filePath);
    return Promise.resolve("File deleted");
  } catch (error) {
    return Promise.reject(error);
  }
};

// send sms throw an api
export const sendSMS = async (phone, msg) => {
  const encodeMsg = encodeURIComponent(msg);
  try {
    const response = await fetch(
      `https://tpsms.xyz/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}&to=${phone}&from=8809612444246&sms=${encodeMsg}`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
