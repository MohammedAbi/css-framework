import { API_AUTH_LOGIN } from "../constants";
import { makeRequest } from "../makeRequest";

export async function login({ email, password }) {
  const formData = { email, password };

  try {
    const response = await makeRequest(API_AUTH_LOGIN, "POST", formData, false);
    console.log("Login response:", response); // Log for debugging

    if (response && response.data) {
      const {
        accessToken,
        name,
        email: userEmail,
        avatar,
        banner,
      } = response.data;

      return {
        token: accessToken,
        user: {
          name, // Include the user's name
          email: userEmail, // Include the user's email
          avatar, // Include the user's avatar
          banner, // Include the user's banner
        },
      };
    } else {
      throw new Error("No data returned from login.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Rethrow to be caught in the calling function
  }
}
