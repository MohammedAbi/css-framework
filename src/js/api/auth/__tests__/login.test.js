import { describe, it, expect, vi } from "vitest";
import { login } from "../login";

// Mock the global localStorage
global.localStorage = {
  getItem: vi.fn(() => null), // Mock getItem to return null by default
  setItem: vi.fn(), // Mock setItem, doesn't do anything in the test
  removeItem: vi.fn(), // Mock removeItem
  clear: vi.fn(), // Mock clear
};

global.fetch = vi.fn();

describe("login", () => {
  it("should return a user object when email and password are provided", async () => {
    const mockResponse = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
      user: { email: "test@example.com" },
    };

    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          accessToken: mockResponse.token,
          email: mockResponse.user.email,
        },
      }),
      ok: true,
    });

    const result = await login({
      email: "test@example.com",
      password: "password",
    });

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error for an invalid login", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: "Invalid credentials" }),
    });

    await expect(
      login({ email: "wrong@example.com", password: "wrongpassword" })
    ).rejects.toThrow();
  });
});
