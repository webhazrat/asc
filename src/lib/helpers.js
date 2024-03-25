import crypto from "crypto";

// generate and otp
export const generateOTP = () => {
  const max = 999999;
  const min = 100000;
  const otp = Math.floor(crypto.randomInt(max - min + 1) + min).toString();
  return otp;
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
