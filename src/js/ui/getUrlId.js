export function getPostId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("postId");
}
