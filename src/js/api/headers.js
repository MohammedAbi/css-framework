import { API_KEY } from "./constants";
import { getKey } from "./getKey";

/**
 * Generates the headers for making API requests.
 * Includes Authorization and/or API Key based on the presence of tokens and the `requireApiKey` flag.
 *
 * @param {boolean} [requireApiKey=false] - A flag to indicate whether the API key is required in the headers.
 * @returns {Promise<Object>} The headers object to be used in the API request.
 * @throws {Error} If the access token is required but missing and `requireApiKey` is `true`.
 */
export async function header(requireApiKey = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Retrieve the access token
  const accessToken = await getKey("accessToken");

  // Add Authorization header if token is available
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else if (requireApiKey) {
    throw new Error("Access token is required but is missing.");
  }

  // Add API Key if required
  if (requireApiKey && API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  return headers;
}
