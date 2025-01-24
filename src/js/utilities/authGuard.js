import { getKey } from "../api/getKey";
import { setLogoutListener } from "../ui/global/logout";

/**
 * Authenticates the user by checking if the access token is stored in local storage.
 * If the user is not authenticated (i.e., no access token), they are redirected to the login page.
 * Displays an alert message notifying the user they must be logged in to view the page.
 *
 * @async
 * @throws {Error} If an error occurs while retrieving the access token from local storage.
 */
export async function authGuard() {
  const accessToken = await getKey("accessToken");
  if (!accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
  return accessToken;
}

setLogoutListener();


