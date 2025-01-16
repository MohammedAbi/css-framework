import { API_AUTH_LOGIN } from "../constants";
import { makeRequest } from "../makeRequest";

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user's login response, which includes an access token and user data.
 * @throws {Error} Error if the login fails, or if no data is returned from the API.
 */
export async function login({ email, password }) {
  const formData = { email, password };

  try {
    const response = await makeRequest(API_AUTH_LOGIN, "POST", formData, false);
    console.log("Login response:", response); // Log for debugging

    if (response && response.data) {
      const { accessToken, email: userEmail } = response.data;

      return {
        token: accessToken,
        user: {
          email: userEmail,
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
