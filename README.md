# 🏥 Hospital Appointment Management System

A full-stack web application for managing hospital appointments, doctors, patients, and administrative operations.

The system provides separate functionality for **Administrators and Patients**, allowing hospital staff to manage doctors, patients, departments, appointments, and reports while patients can manage their profiles and appointments.

---

## 📌 Project Overview

The Hospital Appointment Management System is designed to simplify the process of managing hospital appointments digitally.

### Main Objectives

- Manage doctors and their information
- Manage patient profiles
- Manage hospital departments
- Book and manage appointments
- Provide separate Admin and Patient functionality
- Maintain appointment records
- Provide an organized hospital management interface
- Reduce manual appointment management

---

## 🚀 Features

### 👨‍💼 Admin

- Admin Login
- Admin Dashboard
- Doctor Management
  - Add Doctor
  - View Doctors
  - Update Doctor
  - Delete Doctor

- Patient Management
  - View Patients
  - Create Patient Profile
  - Update Patient
  - Delete Patient

- Department Management
- Appointment Management
- Reports
- Admin Profile
- Settings

### 🧑‍⚕️ Patient

- Patient Registration
- Patient Login
- Patient Profile
- View Personal Information
- Book Appointment
- View My Appointments
- Manage Appointment Information

---

## 🛠️ Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Development Tools

- Visual Studio Code
- MongoDB / MongoDB Atlas
- Thunder Client
- Git
- GitHub

---

## 📁 Project Structure

```text
Hospital-Appointment-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   ├── patient/
│   │   │   └── dashboard/
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** based authentication.

### Authentication Flow

```text
User
  ↓
Login
  ↓
Backend validates credentials
  ↓
JWT Token generated
  ↓
Token stored on Frontend
  ↓
Token sent with API requests
  ↓
Backend verifies token
  ↓
Protected resource accessed
```

### User Roles

- `ADMIN`
- `PATIENT`

Role-based authorization is used to restrict access to protected resources.

---

## 👨‍⚕️ Doctor Management

Admin can manage doctor records using CRUD operations.

### Operations

```text
Create Doctor
     ↓
Read Doctor
     ↓
Update Doctor
     ↓
Delete Doctor
```

### Doctor Information

- Name
- Email
- Phone
- Specialization
- Department
- Other relevant information

---

## 🧑‍🤝‍🧑 Patient Management

The system maintains patient profiles linked with registered users.

### Patient Information

- Name
- Age
- Gender
- Mobile
- Email
- Address
- Blood Group
- Medical Information

Patients can access and update only their own patient information.

---

## 📅 Appointment Management

The appointment module allows patients to book appointments with doctors.

### Appointment Flow

```text
Patient Login
     ↓
Select Doctor
     ↓
Select Date
     ↓
Select Time
     ↓
Enter Appointment Details
     ↓
Book Appointment
     ↓
Appointment Stored in Database
     ↓
Patient can view appointment
```

### Appointment Management

Admin can manage appointment records.

Patients can view their own appointments.

---

## 🌐 API Structure

The backend follows a REST API architecture.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Doctors

```text
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors
PUT    /api/doctors/:id
DELETE /api/doctors/:id
```

### Patients

```text
GET    /api/patients
GET    /api/patients/:id
GET    /api/patients/me
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
```

### Appointments

```text
GET    /api/appointments
GET    /api/appointments/:id
GET    /api/appointments/my
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

> Exact available endpoints may depend on the final backend route configuration.

---

## 🧪 API Testing

APIs were tested during development using **Thunder Client**.

### Testing Process

```text
Start Backend
     ↓
Open Thunder Client
     ↓
Select HTTP Method
     ↓
Enter API Endpoint
     ↓
Add Authorization Token
     ↓
Send Request
     ↓
Verify Response
```

### Tested Operations

- Authentication
- Doctor CRUD
- Patient CRUD
- Appointment APIs
- Protected API access
- Role-based authorization

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open Project

```bash
cd Hospital-Appointment-Management-System
```

---

## 🔧 Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal.

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

If the project uses a frontend API environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit real passwords, database credentials, JWT secrets, or other sensitive values to GitHub.

---

## 🔒 Security

The application implements:

- JWT authentication
- Protected routes
- Role-based authorization
- Password hashing
- Patient ownership validation
- Protected API endpoints
- Environment variables for sensitive configuration

---

## 🧩 Role-Based Access

| Feature                | Admin |          Patient |
| ---------------------- | ----: | ---------------: |
| Admin Dashboard        |    ✅ |               ❌ |
| Doctor Management      |    ✅ |               ❌ |
| Patient Management     |    ✅ |          Limited |
| Department Management  |    ✅ |               ❌ |
| Book Appointment       |    ❌ |               ✅ |
| My Appointments        |    ❌ |               ✅ |
| Appointment Management |    ✅ | Own appointments |
| Reports                |    ✅ |               ❌ |
| Settings               |    ✅ |               ❌ |

---

## 📊 System Architecture

```text
                 ┌─────────────────────┐
                 │      Frontend       │
                 │      React.js       │
                 └──────────┬──────────┘
                            │
                         Axios
                            │
                            ▼
                 ┌─────────────────────┐
                 │       Backend       │
                 │   Node + Express    │
                 └──────────┬──────────┘
                            │
                    Mongoose / MongoDB
                            │
                            ▼
                 ┌─────────────────────┐
                 │      Database       │
                 │       MongoDB       │
                 └─────────────────────┘
```

---

## 📱 Application Pages

### Public

- Home
- Login
- Register

### Admin

- Dashboard
- Doctors
- Departments
- Patients
- Appointments
- Reports
- Profile
- Settings

### Patient

- Profile
- Book Appointment
- My Appointments

---

## 🧪 Development Status

### Completed

- [x] Project setup
- [x] Authentication
- [x] Admin routes
- [x] Patient routes
- [x] Doctor CRUD API
- [x] Patient CRUD API
- [x] Patient self-profile API
- [x] Appointment booking flow
- [x] Thunder Client API testing
- [x] Patient My Appointments page

### Remaining / Final Verification

- [ ] Complete My Appointments API verification
- [ ] Appointment cancellation flow
- [ ] Final UI testing
- [ ] Production environment configuration
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Final live testing

---

## 🚀 Deployment Plan

### Backend

Possible deployment platforms:

- Render
- Railway

### Frontend

Possible deployment platform:

- Vercel

### Database

- MongoDB Atlas

### Production Flow

```text
React Frontend
      ↓
Vercel
      ↓
Express Backend
      ↓
Render / Railway
      ↓
MongoDB Atlas
```

---

## 👩‍💻 Project Development

This project was developed as a practical full-stack web application using the MERN stack.

### Skills Demonstrated

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication
- CRUD Operations
- Role-Based Authorization
- API Testing
- Git & GitHub
- Frontend Routing
- Backend API Integration

---

## 📄 License

This project is developed for educational and internship purposes.
