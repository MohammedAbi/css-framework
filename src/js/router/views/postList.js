import { displayAllPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

async function init() {
  try {
    // Wait for authGuard to complete
    const isAuthenticated = await authGuard();

    // Only proceed if the user is authenticated
    if (isAuthenticated) {
      displayAllPosts();
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
}

// Initialize the page
init();
