import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { makeRequest } from "../makeRequest";

/**
 * Reads all posts.
 *
 * Fetches all posts from the API.
 *
 * @returns {Promise<object>} The response data containing all posts.
 * @throws {Error} If the API request fails.
 */
export async function readAllPosts() {
  try {
    const response = await makeRequest(
      `${API_SOCIAL_POSTS}?_reactions=true`,
      "GET",
      null,
      true
    );
    console.log(response);
    return response; // Return the response data
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
}

/**
 * Reads a single post by its ID.
 *
 * Fetches a specific post from the API using its ID.
 *
 * @param {string|number} id - The ID of the post to read.
 * @returns {Promise<object>} The response data containing the post details.
 * @throws {Error} If the API request fails.
 */
// export async function readPost(id) {
//   try {
//     const response = await makeRequest(
//       `${API_SOCIAL_POSTS}/${id}`,
//       "GET",
//       null,
//       true
//     );
//     console.log(response);
//     return response; // Return the response data
//   } catch (error) {
//     throw new Error(`Error reading post with ID ${id}: ${error.message}`);
//   }
// }
export async function readPost(id, options = {}) {
  try {
    // Convert options to query parameters
    const queryParams = new URLSearchParams(options).toString();
    console.log("Query parameters being sent:", queryParams); // Debugging

    // Fetch the post data from the API
    const response = await makeRequest(
      `${API_SOCIAL_POSTS}/${id}?${queryParams}`,
      "GET",
      null,
      true
    );

    console.log(response); // Debugging
    return response; // Return the response data
  } catch (error) {
    throw new Error(`Error reading post with ID ${id}: ${error.message}`);
  }
}

/**
 * Reads multiple posts with optional pagination and tagging.
 *
 * Fetches a list of posts, with optional filters for pagination and tags.
 *
 * @param {number} [limit=12] - The maximum number of posts to return (default is 12).
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @param {string} [tag] - An optional tag to filter posts.
 * @returns {Promise<Object>} An object containing the posts in the `data` field and pagination details in the `meta` field.
 * @throws {Error} If the API request fails.
 */
export async function readPosts(limit = 12, page = 1, tag) {
  try {
    const query = new URLSearchParams();
    query.append("limit", limit);
    query.append("page", page);
    if (tag) query.append("tag", tag);

    const response = await makeRequest(
      `${API_SOCIAL_POSTS}?${query.toString()}`,
      "GET",
      null,
      true
    );
    console.log(response);
    return response; // Return the response data
  } catch (error) {
    throw new Error(`Error reading posts: ${error.message}`);
  }
}

/**
 * Reads multiple posts by a specific user with optional pagination and tagging.
 *
 * Fetches posts of a specific user with optional pagination and tagging filters.
 *
 * @param {string} username - The username of the user whose posts to read.
 * @param {number} [limit=12] - The maximum number of posts to return (default is 12).
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @param {string} [tag] - An optional tag to filter posts.
 * @returns {Promise<object>} An object containing the posts in the `data` field and pagination details in the `meta` field.
 * @throws {Error} If the API request fails.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    const query = new URLSearchParams();
    query.append("limit", limit);
    query.append("page", page);
    if (tag) query.append("tag", tag);

    const response = await makeRequest(
      `${API_SOCIAL_PROFILES}/${username}?${query.toString()}`,
      "GET",
      null,
      true
    );
    console.log(response);
    return response; // Return the response data
  } catch (error) {
    throw new Error(
      `Error reading posts by user ${username}: ${error.message}`
    );
  }
}
