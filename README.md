# Blog Website – Full Stack Capstone Project

## Project Overview

This project is a Full Stack Blog Website developed using React.js, Node.js, Express.js, MySQL, AWS RDS, and JWT Authentication.

Users can:

* Register an account
* Login securely
* Create blog posts
* View all blogs
* Like blogs
* Delete blogs

The application follows a client-server architecture with a React frontend and Node.js backend connected to a MySQL database hosted on AWS RDS.

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* dotenv
* cors

### Database

* MySQL
* AWS RDS

### DevOps

* Git
* GitHub
* Jenkins

---

## Project Structure

backend/

* config/

  * db.js

* controllers/

  * authController.js
  * blogController.js

* middleware/

  * authMiddleware.js

* models/

  * Blog.js

* routes/

  * authRoutes.js
  * blogRoutes.js

* index.js

frontend/

* src/

  * components/
  * App.js
  * index.js

---

## Features

### Authentication

* User Registration
* User Login
* JWT Token Generation
* Password Hashing using bcryptjs

### Blog Management

* Add Blog
* View Blogs
* Like Blog


### Security

* Password Encryption
* JWT Protected Routes
* Environment Variables

---

## Database Schema

### Users Table

| Column   | Type         |
| -------- | ------------ |
| id       | INT          |
| name     | VARCHAR(255) |
| email    | VARCHAR(255) |
| password | VARCHAR(255) |

### Blogs Table

| Column  | Type         |
| ------- | ------------ |
| id      | INT          |
| title   | VARCHAR(255) |
| content | TEXT         |
| date    | VARCHAR(100) |
| likes   | INT          |

---

## Installation

### Clone Repository

git clone YOUR_GITHUB_REPOSITORY_LINK

### Backend Setup

cd backend

npm install

npm start

### Frontend Setup

cd frontend

npm install

npm start

---

## Environment Variables

Create a .env file inside backend folder.

PORT=5000

DB_HOST=YOUR_RDS_ENDPOINT

DB_USER=admin

DB_PASSWORD=YOUR_PASSWORD

DB_NAME=blog_db

JWT_SECRET=your_secret_key

---
