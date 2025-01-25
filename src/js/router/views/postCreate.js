import { updateLoginButton } from "../../ui/global/updateLoginButton";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

/**
 * Initializes the application by checking if the user is authenticated.
 * If authenticated, it updates the login button to "Logout" and sets up an event listener for the post creation form.
 * If not authenticated, it updates the login button to "Login".
 *
 * @function init
 * @async
 * @throws {Error} If there is an issue during initialization.
 */
async function init() {
  try {
    const isAuthenticated = await authGuard();

    if (isAuthenticated) {
      // Update the login button to "Logout"
      updateLoginButton(true);

      // Set up an event listener for the post creation form
      const form = document.forms.createPost;
      form.addEventListener("submit", onCreatePost);
    } else {
      // User is not authenticated, ensure the button is set to "Login"
      updateLoginButton(false);
    }
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
}

// Initialize the application
init();
