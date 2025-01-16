import { deletePost } from "../../api/post/delete";
import { displayMessage } from "../global/messageUtils";

/**
 * Handles the deletion of a post by asking for user confirmation and calling the deletePost function.
 * Removes the post from the DOM if successfully deleted.
 *
 * @param {Event} event - The click event that triggered the deletion.
 * @returns {void}
 */
export async function onDeletePost(event) {
  const postId = event.target.getAttribute("data-id");

  // Ask for confirmation before deleting
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (!confirmed) {
    return; // If not confirmed, exit the function
  }

  try {
    // Call the deletePost function and pass the post ID
    const isDeleted = await deletePost(postId);
    if (isDeleted) {
      // If deleted, remove the post from the DOM
      const postElement = event.target.closest(".post");
      postElement.remove();
    }
    displayMessage(`Post with ID ${postId} successfully deleted!`, "success");
  } catch (error) {
    console.error("Error deleting post:", error.message);
    displayMessage(`Error: ${error.message}`, "error");
  }
}
