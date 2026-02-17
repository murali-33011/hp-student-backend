
# 🚀 Student Management System API

A secure and production-ready Student Management System built with **Node.js, Express, MongoDB, JWT authentication, and Docker containerization**.

This project demonstrates secure authentication flows, role-based authorization, scalable API design, and backend best practices.

---

## 🔥 Key Features

* Secure password hashing using bcrypt
* JWT-based authentication (1 hour expiration)
* Role-based access control (STUDENT / ADMIN)
* Input validation & sanitization using express-validator
* Rate limiting on authentication endpoints
* API versioning (`/api/v1`)
* Protected routes using middleware
* Docker container support
* Proper error handling & status codes
* Secure schema design with field validation
* Sensitive data exclusion from queries

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Security

* bcryptjs
* jsonwebtoken
* express-validator
* express-rate-limit

### DevOps

* Docker

---

## 📂 Project Structure

```
hyrweb/
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│
├── server.js
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/murali-33011/hp-student-backend.git
cd hyrweb
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4️⃣ Start Server

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

# 🐳 Run with Docker (Recommended)

### Build Image

```bash
docker build -t student-api .
```

### Run Container

```bash
docker run -p 5000:5000 --env-file .env student-api
```

The API will be available at:

```
http://localhost:5000
```

---

# 🔐 Authentication Flow

## Register

**POST** `/api/v1/auth/register`

* Validates input
* Hashes password before saving
* Prevents duplicate email and studentId
* Returns JWT token

### Example Response

```json
{
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Login

**POST** `/api/v1/auth/login`

* Verifies credentials
* Returns JWT token
* Rate limited to prevent brute force attacks

---

# 🔑 Protected Routes

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

Example:

**GET** `/api/v1/students/me`

Returns authenticated user profile.

---

# 👥 Role-Based Authorization

Supported roles:

* STUDENT
* ADMIN

Admin-only routes are protected using middleware:

```js
authorize("ADMIN")
```

---

# 📊 Student Model Design

Designed to reflect real-world student management needs.

### Identification

* firstName
* lastName
* email (unique, normalized)
* studentId (unique)
* role

### Academic Information

* courses
* year (1–5)
* gpa (0–10)
* enrollmentDate
* status (ACTIVE / INACTIVE / GRADUATED)

### Contact Details

* phone
* address
* emergencyContact (nested object)

### Security

* password (hashed, excluded from queries)
* timestamps (createdAt, updatedAt)

---

# 🔒 Security Implementation

* Password hashing with bcrypt (salt rounds: 10)
* JWT authentication with expiration
* Role-based access control
* Rate limiting on authentication endpoints
* Helmet security headers
* Input validation & sanitization
* Duplicate key protection
* Sensitive field exclusion

---

# 📌 API Endpoint Summary

| Method | Endpoint              | Description         | Auth |
| ------ | --------------------- | ------------------- | ---- |
| POST   | /api/v1/auth/register | Register student    | ❌    |
| POST   | /api/v1/auth/login    | Login student       | ❌    |
| GET    | /api/v1/students/me   | Get current profile | ✅    |

---

# 📌 Design Decisions

* MongoDB chosen for schema flexibility
* JWT used for stateless authentication
* Middleware-based architecture for separation of concerns
* Pre-save hook for secure password hashing
* Docker support for environment consistency
* Versioned API for future scalability

---

