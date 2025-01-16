import { register } from "../../api/auth/register";

/**
 * Displays a message in a designated message container.
 *
 * @param {string} text - The message text.
 * @param {string} type - The type of message: "success" or "error".
 */
function displayMessage(text, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block"; // Show the message div
}

/**
 * Handles the registration form submission, gathers form data,
 * and sends the data to the `register` function in the API.
 * If registration is successful, redirects the user to the login page (or another URL).
 * If registration fails, displays an error message to the user.
 *
 * @param {Event} event - The form submit event.
 * @async
 */
export async function onRegister(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Gather only the required form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await register(formData);

    displayMessage(
      "Registration successful! Redirecting to login page...",
      "success"
    );
    setTimeout(() => {
      window.location.href = "../login/";
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    // On error, display error message
    displayMessage(`Registration failed: ${error.message}`, "error");
  }
}
