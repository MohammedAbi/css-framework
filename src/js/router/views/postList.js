import { displayAllPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

let offset = 0; // Track the current offset
const limit = 9; // Initial number of posts to load
const loadMoreLimit = 6; // Number of posts to load on each "Load More" click

async function init() {
  try {
    // Wait for authGuard to complete
    const isAuthenticated = await authGuard();

    // Only proceed if the user is authenticated
    if (isAuthenticated) {
      // Load initial posts
      await displayAllPosts(offset, limit);
      offset += limit; // Update the offset

      // Add event listener to the "Load More" button
      const loadMoreButton = document.getElementById("loadMoreButton");
      if (loadMoreButton) {
        loadMoreButton.addEventListener("click", async () => {
          const newPosts = await displayAllPosts(offset, loadMoreLimit);
          offset += loadMoreLimit; // Update the offset

          // Disable the button if no more posts are available
          if (newPosts.length < loadMoreLimit) {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "No more posts";
          }
        });
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
}

// Initialize the page
init();
