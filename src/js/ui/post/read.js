import { readAllPosts } from "../../api/post/read";
import { displayMessage } from "../../ui/global/messageUtils";
import { authGuard } from "../../utilities/authGuard";

authGuard();

/**
 * Fetches posts from the API and dynamically displays them in the DOM.
 * Each post includes its title, body, tags, associated media (if available),
 * and a "Read More" button.
 *
 * @param {number} limit - The maximum number of posts to display.
 * @returns {Promise<void>} A promise that resolves once the posts are fetched and displayed.
 * @throws {Error} If there is an error fetching the posts or rendering them.
 */
export async function displayAllPosts(limit = Infinity) {
  const postContainer = document.getElementById("postContainer");
  if (postContainer) {
    postContainer.innerHTML = ""; // Clear previous posts
  } else {
    console.warn("Post container not found.");
    return;
  }

  try {
    const response = await readAllPosts(); // Fetch all posts from the API
    const posts = response.data;

    // Limit the number of posts to display
    const limitedPosts = posts.slice(0, limit);

    // Display the limited posts
    limitedPosts.forEach((post) => {
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
        window.location.href = `post/?postId=${postId}`; // Redirect to post details page
      });

      readMoreButtonContainer.appendChild(readMoreButton);
      postElement.appendChild(readMoreButtonContainer);

      // Append the post element to the postContainer
      postContainer.appendChild(postElement);
    });

    displayMessage("Posts loaded successfully!", "success");
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    displayMessage(`Failed to load posts: ${error.message}`, "error");
  }
}

