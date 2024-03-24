import { SERVER_URL } from "@/lib/utils";

export const useRegister = () => {
  const register = async (formData) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const verify = async (formData) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/verify`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { register, verify };
};
