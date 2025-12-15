
# README.md


# User Management Backend

This backend allows **user registration and login** using:

- Node.js + Express
- MongoDB (Atlas)
- bcryptjs for hashing passwords
- JSON Web Tokens (JWT) for authentication

---

## 🛠 Prerequisites

Before starting, make sure you have:

1. **Node.js v24+** installed  
2. **MongoDB Atlas account** (free cluster is fine)  
3. **VSCode REST Client** or **Postman** to test APIs  

---

## 🏗 Setup Instructions

### 1. Clone the project
```bash
git clone git@gitlab.rn.inf.tu-dresden.de:scc/scc-gruppe-08/tripduel/user.git
cd backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create MongoDB Atlas database

1. Login to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Build a free cluster
3. Copy your connection string, e.g.:

```
mongodb+srv://alice:mypassword123@cluster0.mongodb.net/userDB?retryWrites=true&w=majority
```

### 4. Create a `.env` file

```env
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=tripduel
PORT=5000
```

### 5. Start the server

```bash
node server.js
```

✅ Server runs at `http://localhost:5000`
Expected console output:

```
Server running on port 5000
MongoDB connected
```

---

## 🌐 API Endpoints

### 1. Register User

**POST** `/api/auth/register`

**Request Body**

```json
{
  "username": "Alice",
  "password": "mypassword123"
}
```

**Response**

```json
{
  "msg": "Registered successfully",
  "user": {
    "username": "Alice",
    "password": "<hashed password>",
    "_id": "user_id_here",
    "__v": 0
  }
}
```

> stateless: Password is hashed using bcrypt before storing. Backend never stores or knows the original password.

---

### 2. Login User

**POST** `/api/auth/login`

**Request Body**

```json
{
  "username": "Alice",
  "password": "mypassword123"
}
```

**Response**

```json
{
  "msg": "Logged in",
  "token": "<JWT token>",
  "user": {
    "_id": "user_id_here",
    "username": "Alice",
    "password": "<hashed password>",
    "__v": 0
  }
}
```

> The returned `token` must be sent in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

---

### 3. Get Profile (Protected)

**GET** `/api/users/profile`
**Reponse**
```
GET http://localhost:5000/api/users/profile
Authorization: Bearer <JWT token
```

**Response (dummy example)**

```json
{
  "msg": "Profile available",
  "_id": "user_id_here",
  "username": "Alice", 
}
```

> Only accessible with a valid JWT. Password is never stored or returned in plaintext.

---

## 🔑 JWT Overview

* JSON Web Token (JWT) is a **digital key** proving the user is logged in
* Contains `userId` and expiration (`1 day`)
* Backend verifies token on every protected route
* Backend does **not store session state**, authentication is stateless

---

## 📂 Backend Folder Structure

```
backend/
├── config/          # MongoDB connection logic
├── controllers/     # Endpoint logic (register, login, profile)
├── middleware/      # JWT authentication middleware
├── models/          # MongoDB schemas (User model)
├── routes/          # Express routes (authRoutes.js, userRoutes.js)
├── server.js        # Entry point of backend
├── package.json
└── .env             # Environment variables (local, not pushed)
```

### Key Files

* `models/User.js` → defines user schema
* `controllers/userController.js` → register/login/profile logic
* `middleware/authMiddleware.js` → validates JWT
* `routes/authRoutes.js` → `/register`, `/login` endpoints
* `routes/userRoutes.js` → `/profile` endpoint
* `server.js` → connects MongoDB and sets up routes

---

## 🧪 How to Test APIs

Use **VSCode REST Client** or **Postman**:

**Register Example**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Alice",
  "password": "mypassword123"
}
```

**Login Example**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "Alice",
  "password": "mypassword123"
}
```

**Get Profile Example**

```
GET http://localhost:5000/api/users/profile
Authorization: Bearer <JWT token>
```

