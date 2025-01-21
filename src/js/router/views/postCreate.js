import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { updateLoginButton } from "./postList";

authGuard();
updateLoginButton();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
