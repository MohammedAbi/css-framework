// import { readAllPosts, readPost } from "../../api/post/read";
// import { displayMessage } from "../global/messageUtils";
// import { onDeletePost } from "./delete";

// /**
//  * Fetches all posts from the API and dynamically displays them in the DOM.
//  * Each post includes its title, body, tags, associated media (if available),
//  * and buttons for editing or deleting the post.
//  *
//  * @returns {Promise<void>} A promise that resolves once all posts are fetched and displayed.
//  * @throws {Error} If there is an error fetching the posts or rendering them.
//  */
// export async function displayAllPosts() {
//   const postContainer = document.getElementById("postContainer");
//   if (postContainer) {
//     postContainer.innerHTML = ""; // Clear previous posts
//   } else {
//     return;
//   }

//   try {
//     const response = await readAllPosts(); // Ensure this returns the correct posts data
//     const posts = response.data;

//     posts.forEach((post) => {
//       // Create the main post container element
//       const postElement = document.createElement("div");
//       postElement.classList.add("post");

//       // Create and append title
//       const titleElement = document.createElement("h3");
//       titleElement.textContent = post.title;
//       postElement.appendChild(titleElement);

//       // Create and append body
//       const bodyElement = document.createElement("p");
//       bodyElement.textContent = post.body || "No body content available.";
//       postElement.appendChild(bodyElement);

//       // Create and append tags
//       const tagsElement = document.createElement("p");
//       tagsElement.innerHTML = `<strong>Tags:</strong> ${post.tags ? post.tags.join(", ") : "No tags"}`;
//       postElement.appendChild(tagsElement);

//       // Create and append media (image) if available
//       if (post.media?.url) {
//         const imageElement = document.createElement("img");
//         imageElement.src = post.media.url;
//         imageElement.alt = post.media?.alt || "Media";
//         postElement.appendChild(imageElement);
//       }

//       // Create and append view button
//       const view = document.createElement("button");
//       view.classList.add("view-button");
//       view.textContent = "view";
//       view.setAttribute("data-id", post.id);
//       view.addEventListener("click", (event) => {
//         const postId = event.target.getAttribute("data-id");
//         window.location.href = `post/?postId=${postId}`; // Redirect to edit page with postId
//       });
//       postElement.appendChild(view);

//       // Create and append Edit button
//       const editButton = document.createElement("button");
//       editButton.classList.add("edit-button");
//       editButton.textContent = "Edit";
//       editButton.setAttribute("data-id", post.id);
//       editButton.addEventListener("click", (event) => {
//         const postId = event.target.getAttribute("data-id");
//         window.location.href = `post/edit/?postId=${postId}`; // Redirect to edit page with postId
//       });
//       postElement.appendChild(editButton);

//       // Create and append Delete button
//       const deleteButton = document.createElement("button");
//       deleteButton.classList.add("delete-button");
//       deleteButton.textContent = "Delete";
//       deleteButton.setAttribute("data-id", post.id);

//       // Attach the delete button's event listener
//       deleteButton.addEventListener("click", (event) => onDeletePost(event));
//       postElement.appendChild(deleteButton);

//       // Finally, append the post element to the postContainer
//       postContainer.appendChild(postElement);
//     });
//     displayMessage("All posts loaded successfully!", "success");
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//     displayMessage(`Failed to load posts: ${error.message}`, "error");
//   }
// }

// // Function to fetch and display a single post
// // Function to fetch and display a single post
// export async function displaySinglePost() {
//   const postContainer = document.getElementById("singlePostContainer");

//   if (!postContainer) {
//     return;
//   }

//   // Extract postId from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const postId = urlParams.get("postId");

//   if (!postId) {
//     displayMessage("Post ID not found in the URL", "error");
//     return;
//   }

//   try {
//     // Fetch the post details
//     const response = await readPost(postId);
//     const post = response.data;

//     // Clear the container and create the post element
//     postContainer.innerHTML = ""; // Clear previous content
//     const postElement = document.createElement("div");
//     postElement.classList.add("post", "singlePost");

//     // Create and append title
//     const titleElement = document.createElement("h3");
//     titleElement.textContent = post.title;
//     postElement.appendChild(titleElement);

//     // Create and append body
//     const bodyElement = document.createElement("p");
//     bodyElement.textContent = post.body || "No content available.";
//     postElement.appendChild(bodyElement);

//     // Create and append tags
//     const tagsElement = document.createElement("p");
//     tagsElement.innerHTML = `<strong>Tags:</strong> ${
//       post.tags ? post.tags.join(", ") : "No tags"
//     }`;
//     postElement.appendChild(tagsElement);

//     // Add media if available
//     if (post.media?.url) {
//       const imageElement = document.createElement("img");
//       imageElement.src = post.media.url;
//       imageElement.alt = post.media.alt || "Post media";
//       postElement.appendChild(imageElement);
//     }

//     // Create and append "Back Home" button
//     const backButton = document.createElement("button");
//     backButton.classList.add("view-button");
//     backButton.textContent = "Back Home";
//     backButton.addEventListener("click", () => {
//       window.location.href = "../../"; // Redirect to homepage
//     });
//     postElement.appendChild(backButton);

//     // Append the post element to the container
//     postContainer.appendChild(postElement);
//   } catch (error) {
//     console.error("Error fetching post:", error.message);
//     displayMessage(`Failed to load post: ${error.message}`, "error");
//   }
// }

// // Call the initialization function on page load
// displayAllPosts();
// displaySinglePost;

import { readAllPosts, readPost } from "../../api/post/read";
import { displayMessage } from "../global/messageUtils";
import { onDeletePost } from "./delete";

/**
 * Fetches all posts from the API and dynamically displays them in the DOM.
 * Each post includes its title, body, tags, associated media (if available),
 * and buttons for editing or deleting the post.
 *
 * @returns {Promise<void>} A promise that resolves once all posts are fetched and displayed.
 * @throws {Error} If there is an error fetching the posts or rendering them.
 */
// export async function displayAllPosts() {
//   const postContainer = document.getElementById("postContainer");
//   if (postContainer) {
//     postContainer.innerHTML = ""; // Clear previous posts
//   } else {
//     return;
//   }

//   try {
//     const response = await readAllPosts(); // Ensure this returns the correct posts data
//     const posts = response.data;

//     posts.forEach((post) => {
//       // Create the main post container element
//       const postElement = document.createElement("div");
//       postElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

//       // Create and append image
//       const imageElement = document.createElement("img");
//       imageElement.src = post.media?.url || "https://via.placeholder.com/150"; // Use a placeholder if no image
//       imageElement.alt = post.media?.alt || "Post Thumbnail";
//       imageElement.classList.add(
//         "w-full",
//         "h-48",
//         "object-cover",
//         "rounded-md"
//       );
//       postElement.appendChild(imageElement);

//       // Create and append title
//       const titleElement = document.createElement("h2");
//       titleElement.textContent = post.title;
//       titleElement.classList.add("text-xl", "font-semibold", "mt-4");
//       postElement.appendChild(titleElement);

//       // Create and append body
//       const bodyElement = document.createElement("p");
//       bodyElement.textContent = post.body || "No body content available.";
//       bodyElement.classList.add("text-gray-600", "mt-2");
//       postElement.appendChild(bodyElement);

//       // Create and append tags
//       const tagsElement = document.createElement("p");
//       tagsElement.classList.add("mt-2");
//       if (post.tags) {
//         post.tags.forEach((tag) => {
//           const tagElement = document.createElement("span");
//           tagElement.textContent = tag;
//           tagElement.classList.add(
//             "inline-block",
//             "bg-gray-500",
//             "text-white",
//             "text-xs",
//             "font-semibold",
//             "py-1",
//             "px-3",
//             "rounded",
//             "mr-2",
//             "mb-2",
//             "cursor-pointer",
//             "hover:bg-gray-600",
//             "transition-colors"
//           );
//           tagsElement.appendChild(tagElement);
//         });
//       } else {
//         tagsElement.textContent = "No tags";
//       }
//       postElement.appendChild(tagsElement);

//       // Create and append "Read More" button
//       const buttonContainer = document.createElement("div");
//       buttonContainer.classList.add("text-right", "mt-2");
//       const readMoreButton = document.createElement("button");
//       readMoreButton.textContent = "Read More";
//       readMoreButton.classList.add(
//         "rounded-md",
//         "border-2",
//         "border-blue-600",
//         "px-6",
//         "py-1",
//         "font-medium",
//         "text-blue-600",
//         "transition-colors",
//         "hover:bg-blue-600",
//         "hover:text-white"
//       );
//       readMoreButton.addEventListener("click", () => {
//         window.location.href = `post/?postId=${post.id}`; // Redirect to post page
//       });
//       buttonContainer.appendChild(readMoreButton);
//       postElement.appendChild(buttonContainer);

//       // Finally, append the post element to the postContainer
//       postContainer.appendChild(postElement);
//     });

//     displayMessage("All posts loaded successfully!", "success");
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//     displayMessage(`Failed to load posts: ${error.message}`, "error");
//   }
// }

// Call the initialization function on page load

// import { readAllPosts, readPost } from "../../api/post/read";
// import { displayMessage } from "../global/messageUtils";
// import { onDeletePost } from "./delete";

/**
 * Fetches all posts from the API and dynamically displays them in the DOM.
 * Each post includes its title, body, tags, associated media (if available),
 * and buttons for editing or deleting the post.
 *
 * @returns {Promise<void>} A promise that resolves once all posts are fetched and displayed.
 * @throws {Error} If there is an error fetching the posts or rendering them.
 */
export async function displayAllPosts() {
  const postContainer = document.getElementById("postContainer");
  if (postContainer) {
    postContainer.innerHTML = ""; // Clear previous posts
  } else {
    return;
  }

  try {
    const response = await readAllPosts(); // Ensure this returns the correct posts data
    const posts = response.data;

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
        window.location.href = `post/?postId=${postId}`; 
      });

      readMoreButtonContainer.appendChild(readMoreButton);
      postElement.appendChild(readMoreButtonContainer);

      // Append the post element to the postContainer
      postContainer.appendChild(postElement);
    });

    displayMessage("All posts loaded successfully!", "success");
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    displayMessage(`Failed to load posts: ${error.message}`, "error");
  }
}

// Call the initialization function on page load
displayAllPosts();
