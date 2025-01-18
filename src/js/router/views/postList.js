import { displayAllPosts, searchPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

let offset = 0; // Track the current offset
const limit = 9; // Initial number of posts to load
const loadMoreLimit = 6; // Number of posts to load on each "Load More" click

async function init() {
  authGuard();
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

      // Add event listener to the search input
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const query = event.target.value.trim();
          if (query) {
            searchPosts(query); // Call the search function

          } else {
            // If the search input is empty, reload the initial posts
            displayAllPosts(0, limit);
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
