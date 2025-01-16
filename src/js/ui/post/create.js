/**
 * Passes data to the createPost function in api/post and handles the response
 */

import { API_SOCIAL_POSTS } from "../../api/constants";
import { makeRequest } from "../../api/makeRequest";
import { createPost } from "../../api/post/create";
import { displayMessage } from "../global/messageUtils";

/**
 * Handles the creation or editing of a post by passing data to the `createPost` function
 * and managing the response. If a `postId` is present in the URL, it retrieves and populates
 * the form with existing post data for editing. Otherwise, it allows for creating a new post.
 *
 * @param {Event} event - The submit event triggered by the form submission.
 * @returns {Promise<void>} A promise that resolves when the post creation or update is complete.
 * @throws {Error} If there is an error during the API request or form handling.
 */
export async function onCreatePost(event) {
  event.preventDefault();
  const createPostForm = document.getElementById("createPost");

  if (createPostForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    // If a postId exists, retrieve and populate form data for editing
    if (postId) {
      try {
        const postResponse = await makeRequest(
          `${API_SOCIAL_POSTS}/${postId}`,
          "GET",
          null,
          true
        );
        console.log("Post Data for Editing:", postResponse.data);

        document.getElementById("title").value = postResponse.data.title;
        document.getElementById("body").value = postResponse.data.body;
        document.getElementById("tags").value =
          postResponse.data.tags.join(", ");
        document.getElementById("mediaUrl").value = postResponse.data.media.url;
        document.getElementById("mediaAlt").value = postResponse.data.media.alt;
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    // Handle form submission for creating or updating a post
    createPostForm.onsubmit = async (e) => {
      e.preventDefault();

      const formData = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        tags: document
          .getElementById("tags")
          .value.split(",")
          .map((tag) => tag.trim()),
        media: {
          url: document.getElementById("mediaUrl").value,
          alt: document.getElementById("mediaAlt").value,
        },
      };

      try {
        const response = await createPost(formData, postId);
        console.log("Post submission response:", response);
        displayMessage("Post successfully created!", "success");
        setTimeout(() => {
          window.location.href = "../../";
        }, 2000);
      } catch (error) {
        console.error("Error during post submission:", error.message);
        displayMessage(`Post submission failed: ${error.message}`, "error");
      }
    };
  }
}
