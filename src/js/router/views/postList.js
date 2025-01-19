import { displayAllPosts, searchPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

/**
 * Tracks the current offset for pagination.
 * @type {number}
 */
let offset = 0;

/**
 * The initial number of posts to load.
 * @type {number}
 */
const limit = 9;

/**
 * The number of posts to load on each "Load More" click.
 * @type {number}
 */
const loadMoreLimit = 6;

/**
 * Initializes the application.
 *
 * - Ensures the user is authenticated using `authGuard`.
 * - Displays the initial set of posts.
 * - Sets up event listeners for "Load More" and search functionality.
 *
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 * @throws {Error} If there is an error during authentication or post loading.
 */
async function init() {
  try {
    // Check if the user is authenticated
    const isAuthenticated = await authGuard();

    if (isAuthenticated) {
      // Display the initial set of posts
      await displayAllPosts(offset, limit);
      offset += limit;

      // Set up the "Load More" button
      const loadMoreButton = document.getElementById("loadMoreButton");
      if (loadMoreButton) {
        loadMoreButton.addEventListener("click", async () => {
          // Load more posts
          const newPosts = await displayAllPosts(offset, loadMoreLimit);
          offset += loadMoreLimit;

          // Disable the button if there are no more posts to load
          if (newPosts.length < loadMoreLimit) {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "No more posts";
          }
        });
      }

      // Set up the search input
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const query = event.target.value.trim();

          // Search posts if the query is not empty
          if (query) {
            searchPosts(query);
          } else {
            // Display all posts if the query is empty
            displayAllPosts(0, limit);
          }
        });
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
}

// Initialize the application
init();
