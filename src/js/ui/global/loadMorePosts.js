import { displayAllPosts } from "../post/read";

/**
 * Sets up an event listener for the "Load More" button.
 * When the button is clicked, it loads the next set of posts using `displayAllPosts`.
 * If there are no more posts to load, the button is disabled and its text is updated to "No more posts".
 *
 * @function loadMorePosts
 * @async
 * @throws {Error} If there is an issue loading more posts.
 */
let offset = 0;
const loadMoreLimit = 6;

export async function loadMorePosts() {
  const loadMoreButton = document.getElementById("loadMoreButton");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", async () => {
      try {
        const newPosts = await displayAllPosts(offset, loadMoreLimit);
        offset += loadMoreLimit;

        // Disable the button if there are no more posts
        if (newPosts.length < loadMoreLimit) {
          loadMoreButton.disabled = true;
          loadMoreButton.textContent = "No more posts";
        }
      } catch (error) {
        console.error("Error loading more posts:", error.message);
      }
    });
  }
}
