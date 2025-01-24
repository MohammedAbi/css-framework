# Social Media Application
<img width="1510" alt="Image" src="https://github.com/user-attachments/assets/42b07412-fd29-4f95-930a-db4d390dd7ee" />
This image showcases the client-side social media application.

This project is a client-side social media application developed as part of the **JavaScript 2** course assignment and later enhanced during the **CSS Frameworks** course assignment. It implements core CRUD (Create, Read, Update, Delete) functionalities for posts and includes a user authentication system. The application is styled using **Tailwind CSS** and built with modern web development tools like **Vite** and **Vitest**. While essential features are implemented, additional functionalities are planned for future contributors.

---

## Features Implemented

### User Management

- **Register New User**: Allows users to create accounts.
- **Login User**: Authenticates users and provides access to protected features.

### Posts

- **Create Post**: Users can create new posts with a title, body, tags, and media attachments.
- **Read Posts**:
  - View all posts.
  - View a single post by ID.
  - View posts by specific users.
- **Update Post**: Edit existing posts (title, body, tags, and media).
- **Delete Post**: Remove a post from the system.
- **React to Posts**: Add emoji reactions (e.g., likes, dislikes) to posts.
- **Search Posts**: Search functionality for posts by keywords or tags.

---

## Features Pending Completion

The following features are planned but not yet implemented. Future contributors are encouraged to expand on this project:

- **Follow/Unfollow Users**: Enable users to manage their connections.
- **View Followed Users' Posts**: Display posts by followed users.
- **Comment on Posts**: Allow users to leave comments.
- **Reply to Comments**: Enable threaded replies to comments.

---

## Technologies Used

- **Frontend**: JavaScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **API**: Noroff API (v2)

---

## Noroff API Integration

This application uses the **Noroff API** for backend functionality. The API is provided to students for practicing and completing assignments. Below are key details about the API:

### API Base URL

The base URL for the **v2** API is:
https://v2.api.noroff.dev/

### Endpoints

All endpoints should be prefixed with the base URL. For example:

- **Fetch Posts**: `https://v2.api.noroff.dev/posts`
- **User Authentication**: `https://v2.api.noroff.dev/auth`

### CORS Enabled

The API has CORS enabled, allowing you to access it directly from `localhost` during development without encountering CORS errors.

### Important Notes

- All content posted to this API is publicly visible to other students.
- Your account must use your Noroff email address.
- Ensure that the content you post is appropriate for this platform.

---

## Test User Credentials

For testing purposes, you can use the following test user credentials:

- **Email**: `test1001@stud.noroff.no`
- **Password**: `passwordtest1001`

---

## Project Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git


   ```

2. Navigate to the project directory:

   ```
   cd your-repo-name

   ```

3. Install dependencies::

   ```
   npm install

   ```

## Running the Application

Start the development server:

```
npm run dev

```

Build the project for production:

```
npm run build

```

## Running Tests

```
npm run test

```

## Contributing

Contributions are welcome! If you’d like to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes with clear and descriptive messages.

Submit a pull request

## Acknowledgments

Developed as part of the JavaScript 2 and CSS Frameworks courses.

Built with Vite and Tailwind CSS.

Powered by the Noroff API.
