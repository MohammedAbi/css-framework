/**
 * Logs the user out by removing appropriate user data from the browser.
 * This involves clearing the access token and profile data from local storage.
 *
 * @returns {Promise<void>} A promise that resolves when the data has been removed from local storage.
 */

export async function onLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("profileData");
}
