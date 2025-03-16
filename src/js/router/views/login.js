import { onLogin } from "../../ui/auth/login";

/**
 *
 * Sets up an event listener for the login form.
 *
 * @function init
 * @async
 * @throws {Error} If there is an issue during initialization.
 */
async function init() {
  try {
    // Set up an event listener for the login form
    const form = document.forms.login;
    form.addEventListener("submit", onLogin);
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
}

// Initialize the application
init();
