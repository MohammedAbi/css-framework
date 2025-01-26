import { API_SOCIAL_POSTS } from "../../api/constants";
import { getKey } from "../../api/getKey";
import { makeRequest } from "../../api/makeRequest";
import { deletePost } from "../../api/post/delete";
import { readAllPosts, readPost } from "../../api/post/read";
import { displayMessage } from "../../ui/global/messageUtils";
import { authGuard } from "../../utilities/authGuard";

authGuard();

/**
 * Global array to store all posts.
 * @type {Array<Object>}
 */
export let allPosts = [];

/**
 * Fetches and displays a paginated list of posts.
 * @param {number} [offset=0] - The starting index for pagination.
 * @param {number} [limit=6] - The maximum number of posts to display.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of paginated posts.
 */
export async function displayAllPosts(offset = 0, limit = 6) {
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.warn("Post container not found.");
    return [];
  }

  try {
    // Fetch all posts only once
    if (allPosts.length === 0) {
      const response = await readAllPosts();
      allPosts = response.data; // Store all posts globally
    }

    // Slice the posts array based on the offset and limit
    const paginatedPosts = allPosts.slice(offset, offset + limit);

    // Display the paginated posts
    paginatedPosts.forEach((post) => {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
    });

    return paginatedPosts; // Return the fetched posts
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    displayMessage(`Failed to load posts: ${error.message}`, "error");
    return [];
  }
}
/**
 * Fetches and displays a single post based on the `postId` from the URL.
 * The post includes details such as title, body, media, tags, reactions, and comments.
 * If the current user is the author of the post, action buttons (Edit and Delete) are displayed.
 * If no `postId` is provided, the user is redirected to the homepage after displaying an error message.
 *
 * @async
 * @function displaySinglePost
 * @returns {Promise<void>} A promise that resolves when the post is displayed or rejects on error.
 * @throws {Error} If there is an error fetching the post or rendering it.
 */
export async function displaySinglePost() {
  // Get the postId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  // If no postId is provided, show an error message and redirect to the homepage
  if (!postId) {
    displayMessage("No post ID provided.", "error");
    setTimeout(() => {
      window.location.href = "/";
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

    const post = response.data; // Extract the post data from the response
    const currentUser = await getKey("profileData"); // Get the current user's data from localStorage
    const singlePostContainer = document.getElementById("singlePostContainer"); // Get the container for the single post

    // Clear any existing content in the container
    singlePostContainer.innerHTML = "";

    // Create the main post container element
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
      postElement.appendChild(createMediaElement(post));
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
      postElement.appendChild(createTagsElement(post));
    }

    // Post Reactions (if available)
    if (post.reactions && post.reactions.length > 0) {
      postElement.appendChild(createReactionsElement(post));
    }

    // Post Comments (if available)
    if (post.comments && post.comments.length > 0) {
      postElement.appendChild(createCommentsElement(post));
    }

    // Action Buttons (Back, Edit, and Delete)
    postElement.appendChild(createActionButtons(post, currentUser));

    // Append the post element to the container
    singlePostContainer.appendChild(postElement);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    displayMessage(`Failed to load post: ${error.message}`, "error");
  }
}

/**
 * Searches for posts based on a query and dynamically displays the results in the DOM.
 * If no posts are found, a message is displayed indicating that no posts match the query.
 * If the post container is not found, a warning is logged to the console.
 *
 * @async
 * @function searchPosts
 * @param {string} query - The search query used to filter posts.
 * @returns {Promise<void>} A promise that resolves when the search results are displayed or rejects on error.
 * @throws {Error} If there is an error fetching or displaying the search results.
 */
export async function searchPosts(query) {
  // Get the post container element
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.warn("Post container not found.");
    return;
  }

  try {
    // Fetch posts from the search API endpoint using makeRequest
    const url = `${API_SOCIAL_POSTS}/search?q=${encodeURIComponent(query)}`;
    const data = await makeRequest(url, "GET", null, true); // Set requireApiKey to true

    const posts = data.data;

    // Clear the existing posts in the container
    postContainer.innerHTML = "";

    // Display the search results
    if (posts.length === 0) {
      // If no posts are found, display a message
      postContainer.innerHTML = `<p class="text-gray-600">No posts found for "${query}".</p>`;
    } else {
      // If posts are found, create and append post elements for each result
      posts.forEach((post) => {
        const postElement = createPostElement(post);
        postContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error("Error searching posts:", error.message);
    displayMessage(`Failed to search posts: ${error.message}`, "error");
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
 * Creates a post element with the given post data.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The created post element.
 */

export function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");
  postElement.setAttribute("data-post-id", post.id); // Add a data attribute for the post ID

  // Create and append image if available
  if (post.media?.url) {
    const imageElement = document.createElement("img");
    imageElement.src = post.media.url;
    imageElement.alt = post.media?.alt || "Post Thumbnail";
    imageElement.classList.add("w-full", "h-48", "object-cover", "rounded-md");
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

  // Create and append reactions
  const reactionsContainer = createReactionsElement(post);
  reactionsContainer.classList.add("reactions-container"); // Add a unique class
  postElement.appendChild(reactionsContainer);

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

  return postElement;
}

/**
 * Creates the media element for a post.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The media element.
 */
function createMediaElement(post) {
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
  imageElement.addEventListener("click", () => {
    window.open(post.media.url, "_blank");
  });

  mediaElement.appendChild(imageElement);
  return mediaElement;
}

/**
 * Creates the tags element for a post.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The tags element.
 */
function createTagsElement(post) {
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

  return tagsContainer;
}

/**
 * Creates a reactions container with buttons for reacting to a post.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The reactions container element.
 */

function createReactionsElement(post) {
  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("flex", "gap-2", "mt-4");

  // Define the available reaction symbols
  const reactionSymbols = ["👍", "❤️", "😂"];

  // Ensure post.reactions is defined, default to an empty array
  const reactions = post.reactions || [];

  // Create a button for each reaction symbol
  reactionSymbols.forEach((symbol) => {
    // Find the reaction data for the current symbol
    const reaction = reactions.find((r) => r.symbol === symbol);

    // Create a container for the reaction button and count
    const reactionWrapper = document.createElement("div");
    reactionWrapper.classList.add("flex", "items-center", "gap-1");

    // Create the reaction button
    const reactionButton = document.createElement("button");
    reactionButton.textContent = symbol;
    reactionButton.classList.add(
      "text-xl",
      "p-2",
      "rounded-full",
      "hover:bg-gray-200",
      "transition-colors"
    );

    // Create the reaction count element
    const countElement = document.createElement("span");
    countElement.textContent = reaction ? reaction.count : 0; // Display the count (default to 0 if no reactions)
    countElement.classList.add("text-sm", "text-gray-600");

    reactionButton.addEventListener("click", async () => {
      try {
        // Call the API to toggle the reaction
        await toggleReaction(post.id, symbol);

        // Reload the page to reflect the changes
        window.location.reload();
      } catch (error) {
        console.error("Error toggling reaction:", error.message);
        displayMessage(`Failed to react: ${error.message}`, "error");
      }
    });

    // Append the button and count to the wrapper
    reactionWrapper.appendChild(reactionButton);
    reactionWrapper.appendChild(countElement);

    // Append the wrapper to the reactions container
    reactionsContainer.appendChild(reactionWrapper);
  });

  return reactionsContainer;
}

/**
 * Toggles a reaction for a post.
 * @param {number} postId - The ID of the post.
 * @param {string} symbol - The reaction symbol (emoji).
 * @returns {Promise<Object>} The API response.
 */
async function toggleReaction(postId, symbol) {
  const url = `${API_SOCIAL_POSTS}/${postId}/react/${encodeURIComponent(symbol)}`;
  try {
    const response = await makeRequest(url, "PUT", true, true); // requireApiKey: true
    console.log("Toggle reaction response:", response); // Debugging
    return response; // Return the response data
  } catch (error) {
    console.error("Error toggling reaction:", error.message);
    throw error;
  }
}

/**
 * Creates the comments element for a post.
 * @param {Object} post - The post data.
 * @returns {HTMLElement} The comments element.
 */
function createCommentsElement(post) {
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
    commentAuthor.classList.add("text-sm", "font-semibold", "text-gray-700");
    commentElement.appendChild(commentAuthor);

    const commentBody = document.createElement("p");
    commentBody.textContent = comment.body;
    commentBody.classList.add("text-gray-700", "mt-2", "break-words");
    commentElement.appendChild(commentBody);

    commentsList.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsList);
  return commentsContainer;
}

/**
 * Creates the action buttons for a post.
 * @param {Object} post - The post data.
 * @param {Object} currentUser - The current user data.
 * @returns {HTMLElement} The action buttons container.
 */
function createActionButtons(post, currentUser) {
  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.classList.add("flex", "justify-end", "gap-2", "mt-6");

  // Back Button
  const backButton = document.createElement("a");
  backButton.href = "/";
  backButton.textContent = "Back to Feed";
  backButton.classList.add(
    "inline-flex",
    "items-center",
    "justify-center",
    "bg-blue-600",
    "text-white",
    "text-sm",
    "font-semibold",
    "py-2",
    "px-4",
    "rounded-full",
    "hover:bg-blue-700",
    "transition-colors",
    "sm:py-3",
    "sm:px-6",
    "sm:text-base"
  );

  // Edit Button (only show if the current user is the author)
  if (currentUser && currentUser.name === post.author?.name) {
    const editButton = document.createElement("a");
    editButton.href = `/post/edit/?postId=${post.id}`;
    editButton.textContent = "Edit Post";
    editButton.classList.add(
      "inline-flex",
      "items-center",
      "justify-center",
      "bg-gray-500",
      "text-white",
      "text-sm",
      "font-semibold",
      "py-2",
      "px-4",
      "rounded-full",
      "hover:bg-gray-600",
      "transition-colors",
      "sm:py-3",
      "sm:px-6",
      "sm:text-base"
    );
    actionButtonsContainer.appendChild(editButton);
  }

  // Delete Button (only show if the current user is the author)
  if (currentUser && currentUser.name === post.author?.name) {
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
  return actionButtonsContainer;
}

/**
 * Sorts the posts based on the selected criteria and re-renders them.
 * @param {string} sortBy - The sorting criteria ("Sort by Latest" or "Sort by Popularity").
 */

let offset = 0; // Declare at module level
const POSTS_PER_PAGE = 6; // Define the number of posts per page
export function sortPosts(sortBy) {
  if (allPosts.length === 0) {
    console.warn("No posts available to sort.");
    return;
  }

  let sortedPosts;

  switch (sortBy) {
    case "Sort by Latest":
      // Sort by the `created` date (newest first)
      sortedPosts = [...allPosts].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      break;

    case "Sort by Popularity":
      // Sort by the number of reactions (most reactions first)
      sortedPosts = [...allPosts].sort((a, b) => {
        const reactionsA = a.reactions ? a.reactions.length : 0;
        const reactionsB = b.reactions ? b.reactions.length : 0;
        return reactionsB - reactionsA;
      });
      break;

    default:
      console.warn("Invalid sort option:", sortBy);
      return;
  }

  // Update the global allPosts array with the sorted posts
  allPosts = sortedPosts;

  // Reset the offset to 0
  offset = 0;

  // Clear the existing posts in the container
  const postContainer = document.getElementById("postContainer");
  if (postContainer) {
    postContainer.innerHTML = "";

    // Re-render the sorted posts
    const paginatedPosts = allPosts.slice(offset, offset + POSTS_PER_PAGE);
    paginatedPosts.forEach((post) => {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
    });

    // Update the offset for the next load
    offset += POSTS_PER_PAGE;
  }
}
