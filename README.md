# Social Media Application - JavaScript 2 Course Assignment
![image](./public/images/image-1.png)
This image showcases the client-side social media application.


## Overview

This project is a client-side social media application developed as part of the JavaScript 2 course assignment. It implements core CRUD functionalities (Create, Read, Update, and Delete) for posts and includes a user authentication system. While essential features have been implemented, additional functionalities remain incomplete for future contributors.

### Features Implemented

#### User Management

- Register New User: Allows users to create accounts.
- Login User: Authenticates users and provides access to protected features.

#### Posts

- Create Post: Users can create new posts with title, body, tags, and media attachments.
- Read Posts:
  - View all posts.
  - View a single post by ID.
  - View posts by specific users.
- Update Post: Edit existing posts (title, body, tags, and media).
- Delete Post: Remove a post from the system.

### Features Pending Completion

The following features are planned but not yet implemented. Future contributors are encouraged to expand on this project to include:

- Follow/Unfollow Users: Enable users to manage their connections.
- View Followed Users' Posts: Display posts by followed users.
- Search Posts: Add search functionality for posts by keywords or tags.
- Comment on Posts: Allow users to leave comments.
- Reply to Comments: Enable threaded replies to comments.
- React to Posts: Add emoji reactions (e.g., likes, dislikes) to posts.

## Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js
- Code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository

```
git clone https://github.com/MohammedAbi/js2-ca-MohammedAbi.git
```

2. Navigate to the project directory:

```
cd js2-ca-MohammedAbi

```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev

```

### Running Tests

Run all tests:

```
npm run test

```

Run a specific test:

```
npx vitest <name-of-file>

```

Example:

```
npx vitest login

```

## Deployment

Deploy this project using services like Netlify, Vercel, or GitHub Pages.

## Project Details

### Template

This project uses a Vite template with Vanilla JavaScript in Multi-Page Application (MPA) mode. All additional HTML pages should be listed in the vite.config.js file.

## Resources

Noroff API Documentation: https://docs.noroff.dev/docs/v2/social/posts

Noroff API Documentation https://v2.api.noroff.dev/docs/static/index.html#/social-profiles

## Contribution Guide

Contributors are welcome to improve and expand this project. Follow these steps to contribute:

1. Fork the repository.

2. Create a new branch:

```
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:

```
git commit -m "Add descriptive commit message"
```

4. Push your changes:

```
git push origin feature/your-feature-name
```

5. Open a pull request.

## Future Enhancements

- Implement remaining user stories for full functionality:
  - Following/unfollowing users
  - Comments and reactions
  - Post search functionality
- Add styling to improve user experience.
