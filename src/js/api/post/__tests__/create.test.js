import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPost } from "../create";
import { API_KEY, API_SOCIAL } from "../../constants";

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

describe("createPost", () => {
  beforeEach(() => {
    // Clear all mocks between tests
    fetch.mockClear();
    localStorage.clear(); // Clear localStorage mock between tests
  });

  it("should create a post with required title and default optional fields", async () => {
    // Mock data for the response
    const mockResponse = {
      id: 1,
      title: "Test Post",
      body: "",
      tags: [],
      media: null,
    };

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    // Mock input data
    const postData = {
      title: "Test Post",
    };

    // Call the function
    const result = await createPost(postData);

    // Assert the result
    expect(result).toEqual(mockResponse);

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      `${API_SOCIAL}/posts`, // Explicit API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Correct API key
        },
        body: JSON.stringify(postData),
      }
    );
  });

  it("should create a post with all provided fields", async () => {
    // Mock data for the response
    const mockResponse = {
      id: 2,
      title: "Post with media",
      body: "This is a body",
      tags: ["tag1", "tag2"],
      media: {
        url: "https://url.com/image.jpg",
        alt: "An image",
      },
    };

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    // Mock input data
    const postData = {
      title: "Post with media",
      body: "This is a body",
      tags: ["tag1", "tag2"],
      media: {
        url: "https://url.com/image.jpg",
        alt: "An image",
      },
    };

    // Call the function
    const result = await createPost(postData);

    // Assert the result
    expect(result).toEqual(mockResponse);

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      `${API_SOCIAL}/posts`,  // Explicit API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Correct API key
        },
        body: JSON.stringify(postData),
      }
    );
  });

  it("should throw an error if API request fails", async () => {
    // Mock fetch response for a failed request
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        errors: [{ message: "Bad Request" }],
      }),
    });

    // Set a mock access token in localStorage
    localStorage.setItem("accessToken", "mockedAccessToken");

    // Mock input data
    const postData = {
      title: "Failing Post",
    };

    // Assert that the function throws an error
    await expect(createPost(postData)).rejects.toThrow("Bad Request");

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      `${API_SOCIAL}/posts`, // Explicit API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockedAccessToken", // Mocked token
          "X-Noroff-API-Key": API_KEY, // Correct API key
        },
        body: JSON.stringify(postData),
      }
    );
  });

  it("should throw an error if required fields are missing", async () => {
    // Mock input data (missing required "title" field)
    const postData = {};

    // Assert that the function throws an error
    await expect(createPost(postData)).rejects.toThrow("Title is required");

    // Assert fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });
});