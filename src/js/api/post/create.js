import { API_SOCIAL_POSTS } from "../constants";
import { makeRequest } from "../makeRequest";

/**
 * Creates a new post by sending the data to the API.
 *
 * @param {Object} data - The post parameters.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {string[]} [data.tags] - Array of tags associated with the post (optional).
 * @param {Object} [data.media] - Media object containing URL and alt text (optional).
 * @param {string} [data.media.url] - The URL of the media (optional).
 * @param {string} [data.media.alt] - Alt text for the media (optional).
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails.
 */
export async function createPost({ title, body, tags, media }, postId = null) {
  const formData = {
    title,
    body,
    tags,
    media,
  };
  try {
    let response;
    let message;

    if (postId) {
      response = await makeRequest(
        `${API_SOCIAL_POSTS}/${postId}`,
        "PUT",
        formData,
        true
      );
      message = "Post updated successfully";
    } else {
      // If postId is not provided, create a new post
      response = await makeRequest(API_SOCIAL_POSTS, "POST", formData, true);
      message = "Post created successfully";
    }
    console.log(message, response);
    // readPost(4514);
    // readPosts(12, 1, null);
    // readPostsByUser("student60", 12, 1, null);
    return response;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
