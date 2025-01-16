import { API_SOCIAL_POSTS } from "../constants";
import { makeRequest } from "../makeRequest";

/**
 * Deletes a post by its ID.
 *
 * @param {string|number} postId - The ID of the post to delete. Can be a string or number.
 * @returns {boolean} Returns `true` if the post was deleted successfully, `false` if not.
 * @throws {Error} If the API request fails or if the response is unexpected.
 */
export async function deletePost(postId) {
  try {
    // Send the DELETE request to the API endpoint with the given postId
    const response = await makeRequest(
      `${API_SOCIAL_POSTS}/${postId}`, // URL with postId
      "DELETE", // HTTP method DELETE
      null, // No body for DELETE request
      true // Authentication headers (if needed)
    );

    // Check if the response is null (indicating 204 No Content)
    if (response === null) {
      console.log(`Post with ID ${postId} deleted successfully.`);
      return true; // Return true on successful deletion
    }
 
  } catch (error) {
    console.error("Error in deletePost:", error.message);
    throw error; // Re-throw the error for further handling
  }
}
