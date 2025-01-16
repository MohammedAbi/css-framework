import { API_SOCIAL_POSTS } from "../constants"; // API base URL
import { makeRequest } from "../makeRequest"; // Function to make API requests

/**
 * Updates an existing post by sending updated data to the API.
 *
 * @param {string|number} postId - The ID of the post to update.
 * @param {Object} params - The updated post parameters.
 * @param {string} [params.title] - The updated title of the post (optional).
 * @param {string} [params.body] - The updated body of the post (optional).
 * @param {string[]} [params.tags] - Array of updated tags associated with the post (optional).
 * @param {Object} [params.media] - Updated media object containing URL and alt text (optional).
 * @param {string} [params.media.url] - The updated URL of the media (optional).
 * @param {string} [params.media.alt] - Updated alt text for the media (optional).
 * @returns {Promise<Object>} The updated post data from the API.
 * @throws {Error} If the API request fails.
 */
export async function updatePost(postId, { title, body, tags, media }) {
  try {
    const bodyContent = { title, body, tags, media };

    const response = await makeRequest(
      `${API_SOCIAL_POSTS}/${postId}`, // Correct endpoint for updating post
      "PUT", // HTTP method for update
      bodyContent, // Request body
      true // Authenticated request
    );

    console.log("Post updated successfully:", response);
    return response; // Return the updated post data
  } catch (error) {
    throw new Error(`Error updating post with ID ${postId}: ${error.message}`);
  }
}
