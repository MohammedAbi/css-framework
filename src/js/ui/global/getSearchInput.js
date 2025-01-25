import { displayAllPosts, searchPosts } from "../post/read";

/**
 * Sets up an event listener for the search input field.
 * When the user types in the search input, it triggers a search query or displays all posts if the input is empty.
 *
 * @function searchInput
 * @async
 * @throws {Error} If there is an issue setting up the event listener or handling the input event.
 */
export async function searchInput() {
  const searcInput = document.getElementById("searchInput");
  try {
    if (searcInput) {
      searcInput.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        if (query) {
          searchPosts(query);
        } else {
          displayAllPosts(0, limit);
        }
      });
    }
  } catch (error) {
    console.log("Error getting search input", error.message);
  }
}
