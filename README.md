# School Management API

A RESTful API built using Node.js, Express.js, and MySQL for managing school data.

The project allows users to:

- Add new schools to the database
- Fetch schools sorted by proximity to a user’s location

---

# Features

- Add schools with validation
- Fetch schools sorted by nearest distance
- MySQL database integration
- REST API architecture
- Error handling middleware
- Distance calculation using Haversine Formula
- Environment variable configuration using dotenv

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- cors
- nodemon

---

# Folder Structure

```bash
school-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── schoolController.js
│
├── routes/
│   └── schoolRoutes.js
│
├── utils/
│   └── distance.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
