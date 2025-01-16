// /**
//  * Displays a message in a designated message container.
//  *
//  * @param {string} text - The message text to display.
//  * @param {string} type - The type of message: "success" or "error".
//  * @param {string} [selector="message"] - The ID of the message container.
//  */
// export function displayMessage(text, type, selector = "message") {
//   const messageDiv = document.getElementById(selector);

//   if (messageDiv) {
//     messageDiv.textContent = text;
//     messageDiv.className = `message ${type}`;
//     messageDiv.style.display = "block"; // Show the message div

//     // Optionally hide the message after a timeout
//     setTimeout(() => {
//       messageDiv.style.display = "none";
//     }, 5000); // Hides after 5 seconds
//   } else {
//     console.warn(`Message container with ID "${selector}" not found.`);
//   }
// }

/**
 * Displays a message in a designated message container using Tailwind CSS.
 *
 * @param {string} text - The message text to display.
 * @param {string} type - The type of message: "success" or "error".
 * @param {string} [selector="message"] - The ID of the message container.
 */
export function displayMessage(text, type, selector = "message") {
  const messageDiv = document.getElementById(selector);

  if (messageDiv) {
    // Set the message text
    messageDiv.textContent = text;

    // Reset classes and add base Tailwind classes
    messageDiv.className = "mt-5 p-3 rounded-md text-base";

    // Add type-specific Tailwind classes
    if (type === "success") {
      messageDiv.classList.add(
        "bg-green-100", // Background color
        "text-green-700", // Text color
        "border", // Border
        "border-green-300" // Border color
      );
    } else if (type === "error") {
      messageDiv.classList.add(
        "bg-red-100", // Background color
        "text-red-700", // Text color
        "border", // Border
        "border-red-300" // Border color
      );
    }

    // Show the message div by removing the "hidden" class
    messageDiv.classList.remove("hidden");

    // Optionally hide the message after a timeout
    setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, 5000); // Hides after 5 seconds
  } else {
    console.warn(`Message container with ID "${selector}" not found.`);
  }
}
