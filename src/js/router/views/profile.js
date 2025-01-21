import { displayAllPosts } from "../../ui/post/read";
import { authGuard } from "../../utilities/authGuard";import { updateLoginButton } from "./postList";

authGuard();

updateLoginButton();

// Fetch and display only 6 posts
const numberOfPostsToDisplay = 6;
displayAllPosts(numberOfPostsToDisplay); // Pass 6 as the limit argument
