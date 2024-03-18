export const useRegisterMutation = () => {
  const register = async (formData) => {
    try {
      const result = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await result.json();
      if (!result.ok) {
        throw response.error;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verify = async (formData) => {
    try {
      const result = await fetch("http://localhost:3000/api/auth/verify", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (!result.ok) {
        throw response.error;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { register, verify };
};
