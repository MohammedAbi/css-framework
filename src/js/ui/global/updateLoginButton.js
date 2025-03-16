import { onLogout } from "../auth/logout";
import { displayMessage } from "./messageUtils";

/**
 * Updates the login/logout button in the UI based on the user's authentication status.
 * If the user is authenticated, the button text is changed to "Logout" and an event listener is added to handle logout.
 * If the user is not authenticated, the button text is changed to "Login".
 *
 * @function updateLoginButton
 * @param {boolean} isAuthenticated - Indicates whether the user is authenticated (logged in).
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
            window.location.href = "/auth/";
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
