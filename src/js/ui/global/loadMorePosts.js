import { allPosts, createPostElement } from "../post/read";

/**
 * Sets up an event listener for the "Load More" button.
 * When the button is clicked, it loads the next set of posts from the `allPosts` array.
 * If there are no more posts to load, the button is disabled, and its text is updated to "No more posts".
 *
 * @function loadMorePosts
 * @returns {void} This function does not return a value.
 * @throws {Error} If there is an issue loading more posts, an error is thrown and displayed to the user.
 */
let offset = 0;
const POSTS_PER_PAGE = 6; // Number of posts to load per page

export function loadMorePosts() {
  const loadMoreButton = document.getElementById("loadMoreButton");

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", async () => {
      try {
        // Load the next set of posts from the sorted allPosts array
        const paginatedPosts = allPosts.slice(offset, offset + POSTS_PER_PAGE);

        // Display the paginated posts
        const postContainer = document.getElementById("postContainer");
        if (postContainer) {
          paginatedPosts.forEach((post) => {
            const postElement = createPostElement(post);
            postContainer.appendChild(postElement);
          });
        }

        // Update the offset for the next load
        offset += POSTS_PER_PAGE;

        // If no more posts are returned, disable the button and update its text
        if (paginatedPosts.length < POSTS_PER_PAGE) {
          loadMoreButton.disabled = true;
          loadMoreButton.textContent = "No more posts";
          displayMessage("No more posts to load.", "info"); // Inform the user
        }
      } catch (error) {
        console.error("Error loading more posts:", error.message);
        displayMessage(`Failed to load more posts: ${error.message}`, "error"); // Show error message
      }
    });
  }
}
