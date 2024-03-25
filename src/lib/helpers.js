import { unlink, writeFile } from "fs/promises";
import crypto from "crypto";
import { join } from "path";

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

// create a file
export const createFile = async (avatar, folder) => {
  try {
    const folderPath = join(process.cwd(), folder);
    const avatarName = generateFilename(avatar.name);
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(folderPath, avatarName);
    await writeFile(path, buffer);
    return avatarName;
  } catch (error) {
    return error;
  }
};

// unlink a file
export const deleteFile = async (avatarName, folder) => {
  try {
    const folderPath = join(process.cwd(), folder);
    const filePath = join(folderPath, avatarName);
    await unlink(filePath);
    return "File deleted";
  } catch (error) {
    return error;
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
