# Developer Documentation

## Hospital Appointment & OPD Management System

**Developer:** Sarika Gite
**Project Type:** MERN Stack Internship Final Project
**Date:** August 2026

---

## 1. Project Overview

The Hospital Appointment & OPD Management System is a full-stack web application developed using the MERN stack.

The system is designed to manage hospital departments, doctors, patients, appointments, consultations and prescriptions through role-based access.

The application provides separate workflows for:

- SUPER_ADMIN
- ADMIN
- DOCTOR
- PATIENT

The project consists of:

- React.js frontend
- Node.js and Express.js backend
- MongoDB Atlas database
- JWT-based authentication
- REST APIs
- Vercel frontend deployment
- Render backend deployment

---

## 2. Technology Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### Database

- MongoDB Atlas
- MongoDB
- Mongoose ODM

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- npm

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 3. System Architecture

The application follows a three-layer architecture:

```text
User
  |
  v
React Frontend
  |
  | Axios / REST API
  v
Express.js Backend
  |
  | Mongoose
  v
MongoDB Atlas
```

### Frontend

The React frontend handles:

- User interface
- Navigation
- Forms
- Authentication state
- API requests
- Role-based pages
- Dashboard interfaces

### Backend

The Express backend handles:

- Authentication
- Authorization
- Business logic
- CRUD operations
- Appointment management
- Consultation management
- Prescription management
- API responses

### Database

MongoDB Atlas stores:

- Users
- Doctors
- Patients
- Departments
- Appointments
- Consultations
- Prescriptions
- Notifications
- Reports
- Activity logs

---

## 4. Frontend Project Structure

The main frontend structure is:

```text
hospital-management-frontend/
│
├── src/
│   ├── components/
│   │   └── landing/
│   │       └── DepartmentSection.jsx
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── DoctorLayout.jsx
│   │   └── PatientLayout.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── patient/
│   │   ├── common/
│   │   ├── public/
│   │   └── DepartmentDetails.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── appointmentService.js
│   │   ├── departmentService.js
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
└── vite.config.js
```

---

## 5. Backend Project Structure

The backend follows a modular Express.js structure:

```text
hospital-management-backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
│
├── package.json
└── .env
```

### Controllers

Controllers contain the business logic for API operations.

Examples:

- Authentication controller
- Doctor controller
- Patient controller
- Appointment controller
- Department controller
- Consultation controller
- Prescription controller

### Models

Mongoose models define the MongoDB database structure.

### Routes

Routes define REST API endpoints and connect them to controllers.

### Middleware

Middleware handles:

- JWT authentication
- Role authorization
- Request processing
- Error handling

---

## 6. User Roles

### SUPER_ADMIN

The highest-level administrative role.

Responsibilities include:

- System administration
- User management
- Administrative access
- Monitoring system activity

### ADMIN

Administrative users can manage:

- Departments
- Doctors
- Patients
- Appointments
- Reports
- System-related operations

### DOCTOR

Doctors can:

- View appointments
- Manage consultation workflow
- Start consultations
- Complete consultations
- Create prescriptions
- View their profile

### PATIENT

Patients can:

- Register and login
- View dashboard
- Explore departments
- Book appointments
- View appointments
- View appointment history
- View prescriptions
- Manage profile

---

## 7. Authentication

Authentication is implemented using JWT.

### Login Flow

```text
User enters credentials
        |
        v
POST /api/auth/login
        |
        v
Backend validates credentials
        |
        v
JWT token generated
        |
        v
Token returned to frontend
        |
        v
Token stored in localStorage
```

The frontend Axios instance automatically attaches the token to protected requests.

```text
Authorization: Bearer <token>
```

Passwords are protected using bcrypt hashing.

---

## 8. Authorization

Protected routes verify:

1. Whether a JWT token exists.
2. Whether the token is valid.
3. Which role belongs to the authenticated user.
4. Whether that role is authorized to access the requested resource.

Example:

```text
protect
   ↓
authorize("DOCTOR")
   ↓
Doctor-only controller
```

---

## 9. Appointment Management

The appointment module manages the complete patient appointment lifecycle.

### Main operations

- Book appointment
- View appointments
- View appointment history
- Doctor appointment management
- Appointment status updates
- Cancellation

### Appointment Status Flow

```text
BOOKED
   ↓
CHECKED_IN
   ↓
WAITING
   ↓
IN_CONSULTATION
   ↓
COMPLETED
```

Cancellation is also supported where applicable.

The system prevents invalid appointment operations according to the implemented business rules.

---

## 10. Department Management

Departments can be managed through the department module.

Each department contains information such as:

- Department name
- Description
- Status
- Created date
- Updated date

The public frontend also provides an information page for departments.

Users can select a department from the landing page and view its information without entering the administrative dashboard.

---

## 11. Doctor Management

The doctor module provides:

- Doctor creation
- Doctor listing
- Doctor profile
- Doctor availability information
- Appointment association
- Doctor dashboard

Doctors can access their appointments and proceed with consultation and prescription workflows.

---

## 12. Patient Management

The patient module provides:

- Patient registration
- Patient profile
- Patient dashboard
- Appointment booking
- Appointment history
- Prescription viewing

Patient-specific APIs are protected using JWT authentication.

---

## 13. Consultation Module

The consultation module connects a doctor with a booked appointment.

### Flow

```text
Doctor Appointment
       ↓
Start Consultation
       ↓
Consultation In Progress
       ↓
Complete Consultation
       ↓
Prescription
```

Consultation APIs use the appointment ID to identify the related appointment.

---

## 14. Prescription Module

Doctors can create prescriptions after consultation.

A prescription can contain information such as:

- Medicine
- Dosage
- Frequency
- Duration
- Instructions

Patients can later view their prescriptions from the patient dashboard.

---

## 15. Dashboard Modules

### Admin Dashboard

Provides administrative information and access to management modules.

### Doctor Dashboard

Provides:

- Doctor information
- Appointment information
- Consultation access
- Prescription workflow

### Patient Dashboard

Provides:

- Patient information
- Upcoming appointments
- Appointment history
- Prescription access

---

## 16. Frontend API Configuration

The frontend communicates with the backend through Axios.

The API service is configured with the production backend URL.

Example:

```javascript
const api = axios.create({
  baseURL: "https://hospital-management-backend-1-xu6z.onrender.com/api",
});
```

The Axios interceptor retrieves the JWT token from local storage and attaches it to protected requests.

---

## 17. Environment Variables

The backend uses environment variables for sensitive configuration.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=your_frontend_url
```

### Important

Sensitive values such as:

- MongoDB credentials
- JWT secret
- API secrets

must not be committed to GitHub.

The production environment variables are configured separately on Render.

---

## 18. Local Development Setup

### Backend

Open the backend directory:

```bash
cd hospital-management-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

or:

```bash
node src/server.js
```

The backend runs locally on:

```text
http://localhost:5000
```

---

### Frontend

Open another terminal:

```bash
cd hospital-management-frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

## 19. Production Deployment

### Frontend

The React frontend is deployed on Vercel.

Production URL:

```text
https://hospital-management-frontend-nine-alpha.vercel.app/
```

### Backend

The Express backend is deployed on Render.

Production API:

```text
https://hospital-management-backend-1-xu6z.onrender.com/
```

### Database

MongoDB Atlas is used as the production database.

The deployed Render backend successfully connects to MongoDB Atlas.

---

## 20. Git and Version Control

Separate GitHub repositories are maintained for frontend and backend.

### Frontend Repository

```text
https://github.com/sarika1011-gite/hospital-management-frontend
```

### Backend Repository

```text
https://github.com/sarika1011-gite/hospital-management-backend
```

The main development workflow is:

```bash
git status
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel automatically deploys frontend changes pushed to the main branch.

Render automatically deploys backend changes pushed to the configured branch.

---

## 21. Troubleshooting

### Backend returns 404

Check:

- Render deployment status
- Backend route configuration
- Server startup logs
- API URL

### Authentication returns 401

Check:

- Login credentials
- JWT token
- localStorage token
- Authorization header
- JWT secret
- Backend authentication middleware

### CORS error

Check:

- Frontend production URL
- Backend CORS configuration
- Render environment variables

### MongoDB connection error

Check:

- MONGO_URI
- MongoDB Atlas network access
- Database user credentials
- Database cluster availability

### Vite import error

Check:

- File path
- Filename capitalization
- Default/named exports
- Relative import path

---

## 22. Security Considerations

The application follows basic security practices:

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Environment variables for secrets
- CORS configuration
- Server-side validation

Production secrets should never be exposed in frontend source code or committed to GitHub.

---

## 23. Future Enhancements

Possible future improvements include:

- Online payment integration
- Email/SMS appointment notifications
- Real-time OPD queue updates
- Advanced analytics
- Doctor availability calendar
- Hospital staff management
- Prescription PDF generation
- Automated reminders
- Advanced audit logging
- Cloud file/document storage

---

## 24. Conclusion

The Hospital Appointment & OPD Management System demonstrates the practical implementation of a full-stack MERN application.

The project includes authentication, role-based authorization, department management, doctor and patient management, appointment booking, consultation, prescriptions, dashboards, reports and production deployment.

The application is connected to MongoDB Atlas and deployed using Vercel and Render, providing a complete development-to-production workflow.

---

## 25. Project Links

### Frontend Live URL

https://hospital-management-frontend-nine-alpha.vercel.app/

### Backend Live API URL

https://hospital-management-backend-1-xu6z.onrender.com/

### Frontend GitHub

https://github.com/sarika1011-gite/hospital-management-frontend

### Backend GitHub

https://github.com/sarika1011-gite/hospital-management-backend
