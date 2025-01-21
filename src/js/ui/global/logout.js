import { onLogout } from "../auth/logout";
import { displayMessage } from "./messageUtils";

export function setLogoutListener() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await onLogout();
      // If responseData is successfully returned
      displayMessage("User successfully logged out!", "success");
      setTimeout(() => {
        window.location.href = "/auth/login/";
      }, 2000);
    });
  } else {
    return;
  }
}
