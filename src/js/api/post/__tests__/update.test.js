import { describe, it, expect, vi, beforeEach } from "vitest";
import { updatePost } from "../update";
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

describe("updatePost", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear fetch mock between tests
    localStorage.clear(); // Clear localStorage mock between tests
  });

  it("should update a post with required fields and default optional fields", async () => {
    const mockResponse = { id: 1, title: "Updated Post" };

    // Mock fetch response for a successful update
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    const postData = {
      title: "Updated Post",
    };

    const result = await updatePost(1, postData);

    // Assert the result matches the mock response
    expect(result).toEqual(mockResponse);

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/social/posts/1"), // Ensure the URL contains the post ID
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Mocked API key
        },
        body: JSON.stringify(postData), // Ensure the body matches the input data
      }
    );
  });

  it("should update a post with all provided fields", async () => {
    const mockResponse = { id: 2, title: "Updated Post with media" };

    // Mock fetch response for a successful update
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    const postData = {
      title: "Updated Post with media",
      body: "This is an updated body",
      tags: ["tag1", "tag2"],
      media: {
        url: "https://url.com/image.jpg",
        alt: "Updated image",
      },
    };

    const result = await updatePost(2, postData);

    // Assert the result matches the mock response
    expect(result).toEqual(mockResponse);

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/social/posts/2"), // Ensure the URL contains the post ID
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Mocked API key
        },
        body: JSON.stringify(postData), // Ensure the body matches the input data
      }
    );
  });

  it("should throw an error if the API request fails", async () => {
    // Mock fetch response for a failed update
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    const postData = {
      title: "Failing Post",
    };

    // Assert the function throws an error
    await expect(updatePost(3, postData)).rejects.toThrow();

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/social/posts/3"), // Ensure the URL contains the post ID
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Mocked API key
        },
        body: JSON.stringify(postData), // Ensure the body matches the input data
      }
    );
  });

  it("should throw an error if the access token is missing", async () => {
    // Clear localStorage to simulate a missing access token
    localStorage.clear();

    const postData = {
      title: "Post without token",
    };

    // Assert the function throws an error
    await expect(updatePost(4, postData)).rejects.toThrow(
      "Access token is required but is missing."
    );

    // Assert fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
