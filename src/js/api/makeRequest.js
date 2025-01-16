import { header } from "./headers";

/**
 * Makes an API request with the specified parameters.
 * It constructs the request with the appropriate method, headers, and body,
 * sends the request, and processes the response.
 *
 * @param {string} url - The URL of the API endpoint to make the request to.
 * @param {string} [method="GET"] - The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE").
 * @param {Object|null} [body=null] - The body data to send with the request, typically for "POST" or "PUT" methods. It should be an object or `null` for methods without a body.
 * @param {boolean} [requireApiKey=false] - Whether the request requires an API key in the headers. If `true`, an API key will be included in the request.
 * @returns {Promise<Object|null>} A promise that resolves with the parsed JSON response data, or `null` if the response status is 204 (No Content).
 * @throws {Error} If the request fails or if the response contains an error.
 */
export async function makeRequest(
  url,
  method = "GET",
  body = null,
  requireApiKey = false
) {
  try {
    // Get headers from the external function
    const headers = await header(requireApiKey);

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    // If the response status is 204 No Content, return null (no body)
    if (response.status === 204) {
      return null;
    }

    // Otherwise, parse the response body as JSON
    const data = await response.json();

    if (!response.ok) {
      console.error("Response data:", data);
      throw new Error(
        data.errors ? data.errors[0].message : "An error occurred"
      );
    }

    return data;
  } catch (error) {
    console.error("Request error:", error.message);
    throw error;
  }
}
