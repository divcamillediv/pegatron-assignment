# User Management app

This is a full-stack MERN (MongoDB, Express, React, Node.js) application using Vite for the frontend. The app is fully containerized with Docker and Docker Compose, making it easy to run in any environment.

---

## Main functionnalities
- **Add a User**: Name, Gender, Birthday, Occupation, Phone Number, Profile Picture upload
- **Edit/Delete a User**
- **Search for users**: By name, gender and occupation
- **Display the list of users:** Grid or list mode

---

## 🧱 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **DevOps**: Docker + Docker Compose
- **Extras**: CORS setup, Environment variables

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/divcamillediv/pegatron-assignment.git
cd pegatron-assignment
```

### 2. Create an .env file

For the demo, we will use the database connected to my MongoDB account, else: 

```
PORT=3000
MONGO_URI=mongodb://mongo:27017/mydatabase
```

### 3. Run the app locally

- **Frontend**
  ```
  cd frontend
  npm install
  npm run dev
  ```
- **Backend**
  ```
  cd backend
  npm install
  npm run dev
  ```
  OR
  ```
  cd backend
  npm install
  nodemon --exec tsx src/index.ts
  ```

### 4. Running the App with Docker

Make sure you have Docker installed and the WSL 2 backend enabled (if on Windows).
```
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: exposed only internally to backend






