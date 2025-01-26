import { searchInput } from "../../ui/global/getSearchInput";
import { loadMorePosts } from "../../ui/global/loadMorePosts";
import { updateLoginButton } from "../../ui/global/updateLoginButton";
import { displayAllPosts, sortPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

/**
 * Initializes the application by checking if the user is authenticated.
 * If authenticated, it loads the first set of posts, sets up the "Load More" functionality,
 * enables the search input, and updates the login button to "Logout".
 * If not authenticated, it updates the login button to "Login".
 *
 * @function init
 * @async
 * @throws {Error} If there is an issue during initialization.
 */
let offset = 0;
const POSTS_PER_PAGE = 6; // Number of posts to load per page

async function init() {
  try {
    const isAuthenticated = await authGuard();

    if (isAuthenticated) {
      // Load initial posts
      const initialPosts = await displayAllPosts(offset, POSTS_PER_PAGE);
      offset += POSTS_PER_PAGE;

      // Set up "Load More" functionality
      loadMorePosts();

      // Set up search functionality
      searchInput();

      // Update the login button to "Logout"
      updateLoginButton(true);
    } else {
      // User is not authenticated, ensure the button is set to "Login"
      updateLoginButton(false);
    }

    // Add event listeners for sorting
    const sortSelect = document.querySelector("select"); // Select the <select> element

    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        const selectedOption = event.target.value; // Get the selected option
        sortPosts(selectedOption); // Call the sort function
      });
    }
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
}


// Initialize the application
init();
