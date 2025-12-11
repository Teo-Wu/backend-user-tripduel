# User Management Backend

This backend allows **user registration and login** using:

* Node.js + Express
* MongoDB (Atlas)
* bcryptjs for hashing passwords
* JSON Web Tokens (JWT) for authentication

---

## 🛠 Prerequisites

Before starting, make sure you have:

1. **Node.js v24+** installed
2. **MongoDB Atlas account** (free is fine)
3. **VSCode REST Client** or **Postman** to test APIs

---

## 🏗 Setup Instructions

### 1. Clone the project

```bash
git clone git@gitlab.rn.inf.tu-dresden.de:scc/scc-gruppe-08/tripduel/user.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create MongoDB Atlas database

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/) and **login**
2. Click **Build a Cluster** (free cluster is fine)
3. After the cluster is ready, click **Connect → Connect your application(Drivers)**
4. Copy the connection string. It looks like:

```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

5. Replace `<username>`, `<password>`, with your info. Replace `<dbname>` with a name that you want to give to your database. This database will be automatically created if it's not there yet.

Example:

```
mongodb+srv://alice:mypassword123@cluster0.mongodb.net/userDB?retryWrites=true&w=majority
```

---

### 4. Create a `.env` file in `backend/`

```env
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=your_jwt_secret_key(this is just a random string)
PORT=5000
```

> ⚠️ Every teammate should create their own `.env` file with their secrets.

---

### 5. Run the server

```bash
node server.js
```

* Should see:

```
Server running on port 5000
MongoDB connected
```

* Server is now running at: `http://localhost:5000`

---

## 🌐 API Endpoints

### 1. Register User
> ⚠️ username is set to be unique

* **POST** `/api/auth/register`
* **Body (JSON)**

```json
{
  "username": "Alice",
  "password": "mypassword123"
}
```

* **Response**

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

> Password is **hashed** before storing, so it is secure.

---

### 2. Login User

* **POST** `/api/auth/login`
* **Body (JSON)**

```json
{
  "username": "Alice",
  "password": "mypassword123"
}
```

* **Response**

```json
{
  "msg": "Logged in",
  "token": "<JWT token>",
  "user": { ...user info... }
}
```

> The `token` is a **JWT token**. You can use it to access protected APIs by sending it in the header:

```
Authorization: Bearer <token>
```

---

## 🔑 What is JWT?

* JWT = JSON Web Token
* It is a **digital key** that proves you are logged in
* Contains your **user ID** and **expires in 1 day**
* The server checks this key on every request to protected routes
* Without JWT, the server would have to check username/password every time

---

## 🧪 How to test APIs

* Use **VSCode REST Client** or **Postman**
* Example using REST Client:

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Alice",
  "password": "mypassword123"
}
```

---

## 🗄️ Check your database

1. Go to MongoDB Atlas
2. Click **Clusters → Collections**
3. Open your database (`userDB`) to see users

> You can also use **MongoDB Compass** (GUI) to see data.

---

## ✅ Notes

* username is unique
* Keep your **JWT_SECRET** safe
* Passwords are **never stored as plain text**
* Token expires in **1 day** for security
* Each teammate needs their own `.env` file
