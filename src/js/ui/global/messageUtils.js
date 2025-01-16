/**
 * Displays a message in a designated message container.
 *
 * @param {string} text - The message text to display.
 * @param {string} type - The type of message: "success" or "error".
 * @param {string} [selector="message"] - The ID of the message container.
 */
export function displayMessage(text, type, selector = "message") {
  const messageDiv = document.getElementById(selector);

  if (messageDiv) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block"; // Show the message div

    // Optionally hide the message after a timeout
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000); // Hides after 5 seconds
  } else {
    console.warn(`Message container with ID "${selector}" not found.`);
  }
}
