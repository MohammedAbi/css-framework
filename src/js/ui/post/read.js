import { API_SOCIAL_POSTS } from "../../api/constants";
import { getKey } from "../../api/getKey";
import { makeRequest } from "../../api/makeRequest";
import { deletePost } from "../../api/post/delete";
import { readAllPosts, readPost, readPosts } from "../../api/post/read";
import { displayMessage } from "../../ui/global/messageUtils";
import { authGuard } from "../../utilities/authGuard";

authGuard();

/**
 * Fetches posts from the API and dynamically displays them in the DOM.
 * Each post includes its title, body, tags, associated media (if available),
 * and a "Read More" button.
 *
 * @param {number} offset - The starting index for fetching posts.
 * @param {number} limit - The maximum number of posts to fetch.
 * @returns {Promise<Array>} A promise that resolves to the fetched posts.
 * @throws {Error} If there is an error fetching the posts or rendering them.
 */
export async function displayAllPosts(offset = 0, limit = 6) {
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.warn("Post container not found.");
    return [];
  }

  try {
    const response = await readAllPosts(); // Fetch all posts from the API
    const posts = response.data;

    // Slice the posts array based on the offset and limit
    const paginatedPosts = posts.slice(offset, offset + limit);

    // Display the paginated posts
    paginatedPosts.forEach((post) => {
      // Create the main post container element
      const postElement = document.createElement("div");
      postElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

      // Create and append image if available
      if (post.media?.url) {
        const imageElement = document.createElement("img");
        imageElement.src = post.media.url;
        imageElement.alt = post.media?.alt || "Post Thumbnail";
        imageElement.classList.add(
          "w-full",
          "h-48",
          "object-cover",
          "rounded-md"
        );
        postElement.appendChild(imageElement);
      }

      // Create and append title
      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title;
      titleElement.classList.add("text-xl", "font-semibold", "mt-4");
      postElement.appendChild(titleElement);

      // Create and append body
      const bodyElement = document.createElement("p");
      bodyElement.textContent = post.body || "No body content available.";
      bodyElement.classList.add("text-gray-600", "mt-2");
      postElement.appendChild(bodyElement);

      // Create and append tags
      const tagsContainer = document.createElement("p");
      tagsContainer.classList.add("mt-2");
      if (post.tags && post.tags.length > 0) {
        post.tags.forEach((tag) => {
          const tagElement = document.createElement("span");
          tagElement.textContent = tag;
          tagElement.classList.add(
            "inline-block",
            "bg-gray-500",
            "text-white",
            "text-xs",
            "font-semibold",
            "py-1",
            "px-3",
            "rounded",
            "mr-2",
            "mb-2",
            "cursor-pointer",
            "hover:bg-gray-600",
            "transition-colors"
          );
          tagsContainer.appendChild(tagElement);
        });
      } else {
        tagsContainer.textContent = "No tags";
      }
      postElement.appendChild(tagsContainer);

      // Create and append "Read More" button
      const readMoreButtonContainer = document.createElement("div");
      readMoreButtonContainer.classList.add("text-right", "mt-2");

      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreButton.classList.add(
        "rounded-md",
        "border-2",
        "border-blue-600",
        "px-6",
        "py-1",
        "font-medium",
        "text-blue-600",
        "transition-colors",
        "hover:bg-blue-600",
        "hover:text-white"
      );
      readMoreButton.setAttribute("data-id", post.id);
      readMoreButton.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        window.location.href = `/post/?postId=${postId}`; // Redirect to post details page
      });

      readMoreButtonContainer.appendChild(readMoreButton);
      postElement.appendChild(readMoreButtonContainer);

      // Append the post element to the postContainer
      postContainer.appendChild(postElement);
    });

    displayMessage("Posts loaded successfully!", "success");
    return paginatedPosts; // Return the fetched posts
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    displayMessage(`Failed to load posts: ${error.message}`, "error");
    return [];
  }
}

/**
 * Fetches and displays a single post based on the `postId` from the URL.
 */
export async function displaySinglePost() {
  // Get the postId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  if (!postId) {
    displayMessage("No post ID provided.", "error");
    setTimeout(() => {
      window.location.href = "/"; // Redirect to homepage
    }, 2000);
    return;
  }

  try {
    // Fetch the post data from the API with all optional query parameters
    const response = await readPost(postId, {
      _author: true, // Include author details
      _comments: true, // Include comments
      _reactions: true, // Include reactions
    });

    const post = response.data;

    // Log the post data for debugging
    console.log("Post data with all properties:", post);
    console.log("Post author:", post.author);

    // Get the current user's data from localStorage
    const currentUser = await getKey("profileData");

    // Debug the condition for showing the Delete button
    const authorName = post.author?.name || "Unknown Author";
    console.log("Current user name:", currentUser?.name);
    console.log("Post author name:", authorName);

    // Get the container for the single post
    const singlePostContainer = document.getElementById("singlePostContainer");

    // Clear any existing content
    singlePostContainer.innerHTML = "";

    // Create the post structure
    const postElement = document.createElement("div");
    postElement.classList.add(
      "bg-white",
      "p-8",
      "rounded-lg",
      "shadow-md",
      "max-w-4xl",
      "mx-auto"
    );

    // Post Title
    const titleElement = document.createElement("h1");
    titleElement.textContent = post.title;
    titleElement.classList.add(
      "text-3xl",
      "font-bold",
      "mb-6",
      "text-gray-900",
      "break-words"
    );
    postElement.appendChild(titleElement);

    // Post Media (if available)
    if (post.media?.url) {
      const mediaElement = document.createElement("div");
      mediaElement.classList.add("mb-6", "relative");

      const imageElement = document.createElement("img");
      imageElement.src = post.media.url;
      imageElement.alt = post.media.alt || "Post Image";
      imageElement.classList.add(
        "w-full",
        "h-96",
        "object-cover",
        "rounded-lg",
        "shadow-sm",
        "cursor-pointer",
        "hover:opacity-90",
        "transition-opacity"
      );
      mediaElement.appendChild(imageElement);

      // Add a lightbox effect for the image
      imageElement.addEventListener("click", () => {
        window.open(post.media.url, "_blank");
      });

      postElement.appendChild(mediaElement);
    }

    // Post Body
    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body || "No body content available.";
    bodyElement.classList.add(
      "text-gray-700",
      "text-lg",
      "mb-6",
      "break-words"
    );
    postElement.appendChild(bodyElement);

    // Post Tags (if available)
    if (post.tags && post.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.classList.add("flex", "flex-wrap", "gap-2", "mb-6");

      post.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.classList.add(
          "inline-block",
          "bg-gray-500",
          "text-white",
          "text-sm",
          "font-semibold",
          "py-1",
          "px-3",
          "rounded-full",
          "hover:bg-gray-600",
          "transition-colors"
        );
        tagsContainer.appendChild(tagElement);
      });

      postElement.appendChild(tagsContainer);
    }

    // Display Reactions (if available)
    if (post.reactions && post.reactions.length > 0) {
      const reactionsContainer = document.createElement("div");
      reactionsContainer.classList.add("mb-6");

      const reactionsTitle = document.createElement("h3");
      reactionsTitle.textContent = "Reactions:";
      reactionsTitle.classList.add(
        "text-xl",
        "font-semibold",
        "mb-2",
        "text-gray-900"
      );
      reactionsContainer.appendChild(reactionsTitle);

      const reactionsList = document.createElement("div");
      reactionsList.classList.add("flex", "flex-wrap", "gap-2");

      post.reactions.forEach((reaction) => {
        const reactionElement = document.createElement("span");
        reactionElement.textContent = `${reaction.symbol} (${reaction.count})`;
        reactionElement.classList.add(
          "inline-block",
          "bg-gray-200",
          "text-gray-800",
          "text-sm",
          "font-semibold",
          "py-1",
          "px-3",
          "rounded-full"
        );
        reactionsList.appendChild(reactionElement);
      });

      reactionsContainer.appendChild(reactionsList);
      postElement.appendChild(reactionsContainer);
    }

    // Display Comments (if available)
    if (post.comments && post.comments.length > 0) {
      const commentsContainer = document.createElement("div");
      commentsContainer.classList.add("mb-6");

      const commentsTitle = document.createElement("h3");
      commentsTitle.textContent = "Comments:";
      commentsTitle.classList.add(
        "text-xl",
        "font-semibold",
        "mb-2",
        "text-gray-900"
      );
      commentsContainer.appendChild(commentsTitle);

      const commentsList = document.createElement("div");
      commentsList.classList.add("space-y-4");

      post.comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add(
          "bg-gray-100",
          "p-4",
          "rounded-lg",
          "hover:bg-gray-200",
          "transition-colors"
        );

        const commentAuthor = document.createElement("p");
        commentAuthor.textContent = `By: ${comment.author?.name || "Unknown Author"}`;
        commentAuthor.classList.add(
          "text-sm",
          "font-semibold",
          "text-gray-700"
        );
        commentElement.appendChild(commentAuthor);

        const commentBody = document.createElement("p");
        commentBody.textContent = comment.body;
        commentBody.classList.add("text-gray-700", "mt-2", "break-words");
        commentElement.appendChild(commentBody);

        commentsList.appendChild(commentElement);
      });

      commentsContainer.appendChild(commentsList);
      postElement.appendChild(commentsContainer);
    }

    // Action Buttons (Back, Edit, and Delete)
    const actionButtonsContainer = document.createElement("div");
    actionButtonsContainer.classList.add(
      "flex",
      "justify-end", // Align buttons to the right
      "gap-2", // Add spacing between buttons
      "mt-6"
    );

    // Back Button
    const backButton = document.createElement("a");
    backButton.href = "/";
    backButton.textContent = "Back to Feed";
    backButton.classList.add(
      "inline-block",
      "bg-blue-600",
      "text-white",
      "text-sm",
      "font-semibold",
      "py-3",
      "px-6",
      "rounded-full",
      "hover:bg-blue-700",
      "transition-colors"
    );

    // Edit Button (only show if the current user is the author)
    if (currentUser && currentUser.name === authorName) {
      const editButton = document.createElement("a");
      editButton.href = `/post/edit/?postId=${postId}`; // Redirect to edit page
      editButton.textContent = "Edit Post";
      editButton.classList.add(
        "inline-block",
        "bg-gray-500",
        "text-white",
        "text-sm",
        "font-semibold",
        "py-3",
        "px-6",
        "rounded-full",
        "hover:bg-gray-600",
        "transition-colors"
      );
      actionButtonsContainer.appendChild(editButton);
    }

    // Delete Button (only show if the current user is the author)
    if (currentUser && currentUser.name === authorName) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Post";
      deleteButton.classList.add(
        "inline-block",
        "bg-red-600",
        "text-white",
        "text-sm",
        "font-semibold",
        "py-3",
        "px-6",
        "rounded-full",
        "bg-gray-500",
        "transition-colors"
      );
      deleteButton.setAttribute("data-id", post.id);
      deleteButton.addEventListener("click", onDeletePost);

      actionButtonsContainer.appendChild(deleteButton);
    }

    actionButtonsContainer.appendChild(backButton);
    postElement.appendChild(actionButtonsContainer);

    // Append the post to the container
    singlePostContainer.appendChild(postElement);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    displayMessage(`Failed to load post: ${error.message}`, "error");
  }
}
/**
 * Handles the deletion of a post by asking for user confirmation and calling the deletePost function.
 * Redirects to the homepage after successful deletion.
 *
 * @param {Event} event - The click event that triggered the deletion.
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
    await deletePost(postId);

    // Display success message and redirect to the homepage
    displayMessage("Post successfully deleted!", "success");
    setTimeout(() => {
      window.location.href = "/"; // Redirect to homepage
    }, 2000);
  } catch (error) {
    console.error("Error deleting post:", error.message);
    displayMessage(`Failed to delete post: ${error.message}`, "error");
  }
}

/**
 * Searches for posts based on a query and displays the results.
 * @param {string} query - The search query.
 */
export async function searchPosts(query) {
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.warn("Post container not found.");
    return;
  }

  try {
    // Fetch posts from the search API endpoint using makeRequest
    const url = `${API_SOCIAL_POSTS}/search?q=${encodeURIComponent(query)}`;
    const data = await makeRequest(url, "GET", null, true); // Set requireApiKey to true

    const posts = data.data; // Assuming the API returns { data: [...] }

    // Clear the existing posts
    postContainer.innerHTML = "";

    // Display the search results
    if (posts.length === 0) {
      postContainer.innerHTML = `<p class="text-gray-600">No posts found for "${query}".</p>`;
    } else {
      posts.forEach((post) => {
        // Create the main post container element
        const postElement = document.createElement("div");
        postElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

        // Create and append image if available
        if (post.media?.url) {
          const imageElement = document.createElement("img");
          imageElement.src = post.media.url;
          imageElement.alt = post.media?.alt || "Post Thumbnail";
          imageElement.classList.add(
            "w-full",
            "h-48",
            "object-cover",
            "rounded-md"
          );
          postElement.appendChild(imageElement);
        }

        // Create and append title
        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title;
        titleElement.classList.add("text-xl", "font-semibold", "mt-4");
        postElement.appendChild(titleElement);

        // Create and append body
        const bodyElement = document.createElement("p");
        bodyElement.textContent = post.body || "No body content available.";
        bodyElement.classList.add("text-gray-600", "mt-2");
        postElement.appendChild(bodyElement);

        // Create and append tags
        const tagsContainer = document.createElement("p");
        tagsContainer.classList.add("mt-2");
        if (post.tags && post.tags.length > 0) {
          post.tags.forEach((tag) => {
            const tagElement = document.createElement("span");
            tagElement.textContent = tag;
            tagElement.classList.add(
              "inline-block",
              "bg-gray-500",
              "text-white",
              "text-xs",
              "font-semibold",
              "py-1",
              "px-3",
              "rounded",
              "mr-2",
              "mb-2",
              "cursor-pointer",
              "hover:bg-gray-600",
              "transition-colors"
            );
            tagsContainer.appendChild(tagElement);
          });
        } else {
          tagsContainer.textContent = "No tags";
        }
        postElement.appendChild(tagsContainer);

        // Create and append "Read More" button
        const readMoreButtonContainer = document.createElement("div");
        readMoreButtonContainer.classList.add("text-right", "mt-2");

        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read More";
        readMoreButton.classList.add(
          "rounded-md",
          "border-2",
          "border-blue-600",
          "px-6",
          "py-1",
          "font-medium",
          "text-blue-600",
          "transition-colors",
          "hover:bg-blue-600",
          "hover:text-white"
        );
        readMoreButton.setAttribute("data-id", post.id);
        readMoreButton.addEventListener("click", (event) => {
          const postId = event.target.getAttribute("data-id");
          window.location.href = `/post/?postId=${postId}`; // Redirect to post details page
        });

        readMoreButtonContainer.appendChild(readMoreButton);
        postElement.appendChild(readMoreButtonContainer);

        // Append the post element to the postContainer
        postContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error("Error searching posts:", error.message);
    displayMessage(`Failed to search posts: ${error.message}`, "error");
  }
}


