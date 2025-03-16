import { describe, it, expect, vi, beforeEach } from "vitest";
import { register } from "../register";

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

describe("register", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear fetch mock between tests
    localStorage.clear(); // Clear localStorage mock between tests
  });

  it("should return a user object when registration is successful", async () => {
    const mockResponse = {
      data: {
        name: "Test User",
        email: "test@example.com",
        bio: "This is my profile bio",
        avatar: {
          url: "https://example.com/avatar.jpg",
          alt: "Test Avatar",
        },
        banner: {
          url: "https://example.com/banner.jpg",
          alt: "Test Banner",
        },
      },
    };

    // Mock fetch response for a successful registration
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      bio: "This is my profile bio",
      avatar: {
        url: "https://example.com/avatar.jpg",
        alt: "Test Avatar",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "Test Banner",
      },
    };

    const result = await register(userData);

    // Assert the result matches the expected user object
    expect(result).toEqual({
      name: "Test User",
      email: "test@example.com",
      bio: "This is my profile bio",
      avatar: {
        url: "https://example.com/avatar.jpg",
        alt: "Test Avatar",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "Test Banner",
      },
    });

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"), // Ensure the URL contains the registration endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Ensure the body matches the input data
      }
    );
  });

  it("should throw an error when registration fails", async () => {
    // Mock fetch response for a failed registration
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        errors: [{ message: "Registration failed" }],
      }),
    });

    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    // Assert the function throws an error
    await expect(register(userData)).rejects.toThrow("Registration failed");

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"), // Ensure the URL contains the registration endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Ensure the body matches the input data
      }
    );
  });
});
