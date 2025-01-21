import { describe, it, expect, vi, beforeEach } from "vitest";
import { deletePost } from "../delete";
import { API_KEY } from "../../constants";

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();

// Assign the mock to global.localStorage
global.localStorage = localStorageMock;

describe("deletePost", () => {
  beforeEach(() => {
    // Clear all mocks between tests
    fetch.mockClear();
    localStorage.clear(); // Clear localStorage mock between tests
  });

  it("should not throw an error when API returns ok", async () => {
    // Mock fetch response for a successful deletion (204 No Content)
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: async () => null, // Simulate 204 No Content response
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    // Call the function and assert that it does not throw an error
    await expect(deletePost(1)).resolves.not.toThrow();

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/social/posts/1"), // Ensure the URL contains the post ID
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Mocked API key
        },
      }
    );
  });

  it("should throw an error when the API response is not ok", async () => {
    // Mock fetch response for a failed deletion
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        errors: [{ message: "Post not found" }],
      }),
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    // Call the function and assert that it throws an error
    await expect(deletePost(1)).rejects.toThrow("Post not found");

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/social/posts/1"), // Ensure the URL contains the post ID
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Mocked API key
        },
      }
    );
  });

  it("should throw an error if the access token is missing", async () => {
    // Clear localStorage to simulate a missing access token
    localStorage.clear();

    // Call the function and assert that it throws an error
    await expect(deletePost(1)).rejects.toThrow(
      "Access token is required but is missing."
    );

    // Assert fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
