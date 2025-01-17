import { login } from "../../api/auth/login";
import { saveKey } from "../../api/getKey";
import { displayMessage } from "../global/messageUtils";

/**
 * Handles the login process by collecting form data, passing it to the login function,
 * and handling the response. If successful, stores the access token and profile data
 * in local storage and redirects the user to the homepage.
 *
 * @param {Event} event - The form submission event.
 * @async
 */
export async function onLogin(event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await login(formData);
    displayMessage("Login successful! Redirecting...", "success");

    await saveKey("accessToken", response.token);
    await saveKey("profileData", response.user.email);

    setTimeout(() => {
      window.location.href = "../../";
    }, 2000);
  } catch (error) {
    displayMessage(`Login failed: ${error.message}`, "error");
  }
}
