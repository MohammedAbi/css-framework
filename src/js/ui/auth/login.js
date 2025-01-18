
import { login } from "../../api/auth/login";
import { saveKey } from "../../api/getKey";
import { displayMessage } from "../global/messageUtils";

export async function onLogin(event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await login(formData);
    displayMessage("Login successful! Redirecting...", "success");

    // Save the entire profile to localStorage
    const profile = {
      name: response.user.name, // User's name
      email: response.user.email, // User's email
      avatar: response.user.avatar, // User's avatar
      banner: response.user.banner, // User's banner
      accessToken: response.token, // Access token
    };

    await saveKey("profileData", profile); // Save the entire profile
    await saveKey("accessToken", response.token); // Save the access token separately

    // Redirect to the homepage
    setTimeout(() => {
      window.location.href = "/"; // Redirect to the root path
    }, 2000);
  } catch (error) {
    displayMessage(`Login failed: ${error.message}`, "error");
  }
}
