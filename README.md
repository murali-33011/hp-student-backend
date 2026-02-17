__Overview__

This project is a secure Student Management System built using Node.js, Express, MongoDB, and JWT authentication.

_It demonstrates:_

  Secure authentication with encrypted passwords
  Role-based authorization (Student/Admin)
  Thoughtful student data modeling
  RESTful API design
  Proper validation and error handling

__🛠 Tech Stack__

  _Backend:_
    Node.js
    Express.js
    
  _Database:_
    MongoDB
    Mongoose ODM
    
  _Security:_
    bcryptjs (Password hashing)
    jsonwebtoken (JWT authentication)
    express-validator (Input validation)


__📂 Project Structure__
================================
  hyrweb/
│
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│
├── server.js
├── package.json
└── .env
================================

__⚙️ Setup Instructions__

  1️⃣ Clone Repository
      git clone <repo-url>
      cd hyrweb

  2️⃣ Install Dependencies
      npm install

  3️⃣ Environment Variables
      Create a .env file in root:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    
  4️⃣ Start Server
      npm start / npm run dev

    Server runs on:
    http://localhost:5000

__🔐 Authentication Flow__

_Registration_
API ENDPOINT:
POST /api/v1/auth/register
  Validates input
  Hashes password using bcrypt
  Stores student securely
  Returns JWT token (expires in 1 hour)

_Login_
API ENDPOINT:
POST /api/v1/auth/login
  Verifies email and password
  Returns JWT token

__🔑 Protected Routes__

  All protected routes require:
    Authorization: Bearer <your_token>
  Example:
  GET /api/v1/students/me
    Returns logged-in user profile.

__👥 Role-Based Authorization__

Two roles supported:
STUDENT
ADMIN

Admin-only routes are protected using authorization middleware.

__🗂 Student Model Design__

  The Student model includes:
    Identification
    firstName
    lastName
    email (unique)
    studentId (unique)
    role
    Academic Information
    courses
    year (1–5)
    GPA (0–10)
    enrollmentDate
    status (ACTIVE / INACTIVE / GRADUATED)
    phone
    address
    emergencyContact (phone)

  Security
    password (hashed)
    timestamps (createdAt, updatedAt)

__🔒 Security Features__

>Passwords hashed using bcrypt (salt rounds: 10)
>JWT authentication with expiration
>Role-based access control
>Input validation using express-validator
>Sensitive fields excluded from queries

__API ENDPOINT SUMMARY__

| Method | Endpoint       | Description      | Auth Required |
| ------ | -------------- | ---------------- | ------------- |
| POST   | /auth/register | Register student | ❌             |
| POST   | /auth/login    | Login student    | ❌             |
| GET    | /students/me   | Get profile      | ✅             |

__📌 Assumptions & Design Decisions__

->MongoDB chosen for flexibility in schema design.
->JWT expiration set to 1 hour for security.
->Password hashing handled via Mongoose pre-save hook.
->Role field added to demonstrate authorization capability.
->Email normalized to lowercase to avoid duplicates.
