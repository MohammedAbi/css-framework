import { getPostId } from "../../ui/getUrlId";
import { loadPostData } from "../../ui/populatedForm";
import { onUpdatePost } from "../../ui/post/update"; // Function to handle post update
import { authGuard } from "../../utilities/authGuard"; // Authentication guard

authGuard(); // Ensure the user is authenticated

/**
 * Utility function to extract the `postId` from the URL query parameters.
 * @returns {string|null} The `postId` from the URL or null if not present.
 */

// Extract `postId` from the URL
const postId = getPostId();

/**
 * Redirects the user to the post list page if no `postId` is found in the URL.
 * If `postId` is missing, the page will redirect to "/post/postList/".
 */
if (!postId) {
  window.location.href = "/"; // Redirect to post list if postId is missing
}

/**
 * Fetches the post data by ID and pre-fills the form with the existing post data.
 * If an error occurs while fetching the post data, an error message is displayed.
 *
 * @async
 * @function loadPostData
 * @returns {Promise<void>} Resolves when the post data is successfully fetched and form is populated.
 */

// Call `loadPostData` on page load to populate the form with existing post data
loadPostData();

/**
 * Attaches the form submit event listener to trigger the `onUpdatePost` function
 * when the user submits the form.
 * This function listens for the `submit` event on the form with the ID `editPostForm`.
 */
document
  .getElementById("editPostForm")
  .addEventListener("submit", onUpdatePost);
