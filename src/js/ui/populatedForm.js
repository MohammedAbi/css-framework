/**
 * Fetches the post data by ID and pre-fills the form with the existing post data.
 * If an error occurs while fetching the post data, an error message is displayed.
 *
 * @async
 * @function loadPostData
 * @returns {Promise<void>} Resolves when the post data is successfully fetched and form is populated.
 */

import { readPost } from "../api/post/read";
import { getPostId } from "./getUrlId";

export async function loadPostData() {
  // Extract `postId` from the URL
  const postId = getPostId();
  try {
    const response = await readPost(postId); // Fetch the post data by ID
    const post = response.data;

    // Pre-fill form with the existing post data
    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body;
    document.getElementById("tags").value = post.tags.join(", ");
    document.getElementById("mediaUrl").value = post.media?.url || "";
    document.getElementById("mediaAlt").value = post.media?.alt || "";
  } catch (error) {
    console.error("Error fetching post data:", error.message);
    document.getElementById("postError").textContent =
      "Error loading post data."; // Display error message on the UI
  }
}
