# 📚 Odin Project Blog API

[![Live Preview](https://img.shields.io/badge/Live_Preview-Available-brightgreen)](https://my-blog-api.netlify.app/)  
[![Backend Repository](https://img.shields.io/badge/Backend_Repo-Link-blue)](https://github.com/BigWojtek7/odin-express-blog-api)

# Blog Application  

A blog application built as part of the [The Odin Project](https://www.theodinproject.com/) curriculum.  

This web app allows users to:  
- View posts  
- Comment on posts (if logged in)  
- **Admin users** have additional permissions to:  
  - Add and delete posts  
  - Delete comments  

## Features  
- **TypeScript**: The application is fully typed, ensuring safer and more maintainable code.  
- **Testing**: Comprehensive tests written with Vitest and React Testing Library to guarantee reliability and functionality.  
- **Modern Design**: Styled with CSS Modules for scoped, maintainable, and reusable styles.  

## 🚀 Features

- **View Posts**: Browse blog posts without logging in.
  ![Main screen](./src/assets/images/homepage.png)
- **Comment**: Log in to leave comments on posts.
  ![Login](./src/assets/images/login.png)
- **Admin Permissions**: As an admin, you can add and delete posts and delete comments.
  ![New post](./src/assets/images/new-post.png)
- **Post details**: You can browse posts without logging in (click the 'More' button on the homepage).
  ![Post details](./src/assets/images/post-page.png)

## 🌐 Live Demo

Check out the live version: [Live Preview](https://my-blog-api.netlify.app/)

## 📂 Project Structure

```plaintext
📦 odin-project-blog-api
├── 📁 public                # Static files
├── 📁 src
│   ├── 📁 components        # React components
│   ├── 📁 contexts          # Context API for global state
│   ├── 📁 hooks             # Custom hooks
│   ├── 📁 pages             # Main pages (e.g., Home, Login)
│   ├── 📁 services          # API calls
│   └── App.js               # Main app component
├── README.md                # Project documentation
└── package.json             # Project dependencies
```

## ⚙️ Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BigWojtek7/odin-express-blog-api.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd odin-express-blog-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🧑‍💻 User Accounts

### Admin Account

To test admin functionalities, log in with the following account:

<details>
<summary>Show credentials</summary>

- **Username**: `admin`
- **Password**: `admin`

</details>

### Regular User Account

You can create a regular user account in the app, or use the example account:

<details>
<summary>Show credentials</summary>

- **Username**: `user`
- **Password**: `user`

</details>

## 🛠 Tech Stack

- **Frontend**: React
- **Backend**: Express
- **Database**: PostGreSQL
- **Authentication**: JSON Web Token (JWT)
- **Styling**: CSS Modules

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
