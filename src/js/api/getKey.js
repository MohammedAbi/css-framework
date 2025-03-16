/**
 * Saves a key-value pair to the local storage.
 * The value is stored as a JSON string.
 *
 * @param {string} key - The key under which the value should be stored.
 * @param {any} value - The value to be stored. This can be any JavaScript data type.
 * @returns {Promise<void>} A promise that resolves when the data is saved to local storage.
 * @throws {Error} If saving to local storage fails.
 */
export async function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(`Failed to save data to local storage: ${error.message}`);
  }
}

/**
 * Retrieves a value from local storage by its key.
 * If the item doesn't exist, it returns `null`.
 *
 * @param {string} key - The key of the item to retrieve from local storage.
 * @returns {Promise<any|null>} The parsed value stored under the given key, or `null` if not found.
 */
export async function getKey(key) {
  const item = localStorage.getItem(key);
  if (item === null) return null; // Return `null` if the item doesn't exist

  try {
    // Attempt to parse the item as JSON
    return JSON.parse(item);
  } catch (error) {
    // If parsing fails, return the raw item as a string
    return item;
  }
}

