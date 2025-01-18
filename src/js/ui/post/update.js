import { updatePost } from "../../api/post/update"; // Function to update post via API
import { getPostId } from "../getUrlId";
import { displayMessage } from "../global/messageUtils";

/**
 * Handles form submission for updating a post.
 * Collects updated data from the form, validates it, and sends the updated data to the API.
 * On success, alerts the user and redirects to the post list page.
 * On failure, alerts the user with an error message.
 *
 * @param {Event} event - The form submit event. The `submit` event triggered when the form is submitted.
 * @async
 * @returns {Promise<void>} Resolves when the post is updated or an error occurs.
 */
export async function onUpdatePost(event) {
  event.preventDefault(); // Prevent default form submission (page refresh)

  const postId = getPostId(); // Get postId from URL

  if (!postId) {
    alert("Post ID is missing.");
    return;
  }

  // Collect updated data from the form
  const updatedData = {
    title: document.getElementById("title").value.trim(),
    body: document.getElementById("body").value.trim(),
    tags: document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim()), // Convert tags to an array
    media: {
      url: document.getElementById("mediaUrl").value.trim(),
      alt: document.getElementById("mediaAlt").value.trim(),
    },
  };

  try {
    // Call updatePost function to send data to API
    const response = await updatePost(postId, updatedData);

    // On success, alert user and redirect to post list
    displayMessage("Post updated successfully!", "success");
    setTimeout(() => {
      window.location.href = "./";
    }, 2000);
  } catch (error) {
    console.error("Error updating the post:", error.message);
    displayMessage("Failed to update the post. Please try again.", "error");
  }
}

/**
 * Utility function to extract the `postId` from the URL query parameters.
 * This is used to fetch the post data and update the post.
 *
 * @returns {string|null} The `postId` from the URL or null if not present.
 */
