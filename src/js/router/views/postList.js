
import { onLogout } from "../../ui/auth/logout";
import { displayMessage } from "../../ui/global/messageUtils";
import { displayAllPosts, searchPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";

let offset = 0;
const limit = 9;
const loadMoreLimit = 6;

async function init() {
  try {
    const isAuthenticated = await authGuard();

    if (isAuthenticated) {
      await displayAllPosts(offset, limit);
      offset += limit;

      const loadMoreButton = document.getElementById("loadMoreButton");
      if (loadMoreButton) {
        loadMoreButton.addEventListener("click", async () => {
          const newPosts = await displayAllPosts(offset, loadMoreLimit);
          offset += loadMoreLimit;

          if (newPosts.length < loadMoreLimit) {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "No more posts";
          }
        });
      }

      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const query = event.target.value.trim();
          if (query) {
            searchPosts(query);
          } else {
            displayAllPosts(0, limit);
          }
        });
      }

      // Update the login button to logout
      updateLoginButton(true);
    } else {
      // User is not authenticated, ensure the button is set to login
      updateLoginButton(false);
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
}

/**
 * Updates the login button based on the user's authentication status.
 *
 * @param {boolean} isAuthenticated - Whether the user is authenticated.
 */
export function updateLoginButton(isAuthenticated) {
  const loginButtonContainer = document.querySelector('a[href="/auth/login/"]');
  if (loginButtonContainer) {
    if (isAuthenticated) {
      // Change the button to "Logout"
      loginButtonContainer.innerHTML = `
        <button id="logoutButton" class="mt-2 sm:mt-0 rounded-md border-2 border-red-600 px-6 py-1 font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white">
          Logout
        </button>
      `;

      // Add an event listener for the logout button
      const logoutButton = document.getElementById("logoutButton");
      if (logoutButton) {
        logoutButton.addEventListener("click", async (event) => {
          event.preventDefault();
          await onLogout();
          displayMessage("Successfully logged out!", "success");
          setTimeout(() => {
            window.location.href = "/auth/login/";
          }, 2000);
        });
      }
    } else {
      // Change the button to "Login"
      loginButtonContainer.innerHTML = `
        <button class="mt-2 sm:mt-0 rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
          Login
        </button>
      `;
    }
  }
}

// Initialize the application
init();