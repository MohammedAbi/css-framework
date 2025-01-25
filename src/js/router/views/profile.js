import { updateLoginButton } from "../../ui/global/updateLoginButton";
import { displayAllPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

/**
 * Initializes the application by checking if the user is authenticated.
 * If authenticated, it updates the login button to "Logout" and displays the first 6 posts.
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

      // Fetch and display only 6 posts
      const numberOfPostsToDisplay = 6;
      displayAllPosts(numberOfPostsToDisplay); // Pass 6 as the limit argument
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
