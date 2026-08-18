# Hospital Appointment Management System — API Documentation

## 1. Base URL

### Development

```text
http://localhost:5000/api
```

### Production

```text
YOUR_DEPLOYED_BACKEND_URL/api
```

---

# 2. Authentication APIs

## Register User

**Method:** `POST`

**Endpoint:**

```text
/api/auth/register
```

### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "password": "Password@123",
  "role": "PATIENT"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

## Login User

**Method:** `POST`

**Endpoint:**

```text
/api/auth/login
```

### Request Body

```json
{
  "email": "rahul@example.com",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "JWT_TOKEN"
}
```

The returned JWT token is required for protected APIs.

---

# 3. Doctor APIs

## Get All Doctors

**Method:** `GET`

```text
/api/doctors
```

**Access:** Admin

---

## Get Doctor By ID

**Method:** `GET`

```text
/api/doctors/:id
```

**Access:** Admin

---

## Create Doctor

**Method:** `POST`

```text
/api/doctors
```

**Access:** Admin

### Request Body

```json
{
  "name": "Dr. Rahul Sharma",
  "email": "rahul.sharma@mediflow.com",
  "phone": "9876543210",
  "specialization": "Cardiology"
}
```

---

## Update Doctor

**Method:** `PUT`

```text
/api/doctors/:id
```

**Access:** Admin

### Request Body

```json
{
  "name": "Dr. Rahul Sharma",
  "email": "rahul.sharma@mediflow.com",
  "phone": "9876543210",
  "specialization": "Cardiology"
}
```

---

## Delete Doctor

**Method:** `DELETE`

```text
/api/doctors/:id
```

**Access:** Admin

---

# 4. Patient APIs

## Get All Patients

**Method:** `GET`

```text
/api/patients
```

**Access:** Admin

---

## Get Patient By ID

**Method:** `GET`

```text
/api/patients/:id
```

**Access:** Admin / Patient

Patients can access only their own patient record.

---

## Get My Patient Profile

**Method:** `GET`

```text
/api/patients/me
```

**Access:** Patient

### Authorization

```text
Authorization: Bearer JWT_TOKEN
```

---

## Create Patient Profile

**Method:** `POST`

```text
/api/patients
```

**Access:** Admin / Patient

### Request Body

```json
{
  "name": "Rahul Sharma",
  "age": 25,
  "gender": "Male",
  "mobile": "9876543210",
  "email": "rahul@example.com",
  "address": "Mumbai",
  "bloodGroup": "O+",
  "medicalInformation": "No major medical history"
}
```

---

## Update Patient

**Method:** `PUT`

```text
/api/patients/:id
```

**Access:** Admin / Patient

---

## Delete Patient

**Method:** `DELETE`

```text
/api/patients/:id
```

**Access:** Admin

The application uses soft deletion for patient records.

---

# 5. Appointment APIs

## Get All Appointments

**Method:** `GET`

```text
/api/appointments
```

**Access:** Admin

---

## Get Appointment By ID

**Method:** `GET`

```text
/api/appointments/:id
```

**Access:** Admin / Patient

---

## Get My Appointments

**Method:** `GET`

```text
/api/appointments/my
```

**Access:** Patient

### Authorization

```text
Authorization: Bearer JWT_TOKEN
```

Returns appointments belonging to the logged-in patient.

---

## Create Appointment

**Method:** `POST`

```text
/api/appointments
```

**Access:** Patient

### Example Request

```json
{
  "doctor": "DOCTOR_ID",
  "appointmentDate": "2026-08-20",
  "appointmentTime": "10:30 AM",
  "reason": "General consultation"
}
```

---

## Update Appointment

**Method:** `PUT`

```text
/api/appointments/:id
```

**Access:** Admin / Authorized Patient

---

## Delete / Cancel Appointment

**Method:** `DELETE`

```text
/api/appointments/:id
```

**Access:** Admin / Authorized Patient

---

# 6. Authorization

Protected APIs require a JWT token.

### Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# 7. HTTP Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Request successful    |
| 201         | Resource created      |
| 400         | Bad request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource not found    |
| 409         | Conflict              |
| 500         | Internal server error |

---

# 8. Common Response Format

### Successful Response

```json
{
  "success": true,
  "message": "Operation successful.",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

---

# 9. API Testing

The APIs are tested using **Thunder Client**.

Testing includes:

- User Registration
- User Login
- Doctor CRUD
- Patient CRUD
- Patient Profile
- Appointment Creation
- Appointment Retrieval
- Protected Routes
- Role-Based Authorization

---

# 10. API Development Workflow

```text
Client Request
      ↓
Express Route
      ↓
Authentication Middleware
      ↓
Authorization Middleware
      ↓
Controller
      ↓
Mongoose Model
      ↓
MongoDB
      ↓
JSON Response
```

---

# 11. Security Notes

- JWT tokens are used for authentication.
- Protected endpoints require authentication.
- Role-based authorization restricts access.
- Patients cannot access another patient's records.
- Sensitive environment variables must not be committed to GitHub.
- Passwords must be stored using secure hashing.

---

# 12. Production Configuration

Before deployment, update:

```text
Frontend API URL
Backend CORS configuration
MongoDB Atlas connection
JWT secret
Environment variables
```

The production API URL should replace the local development URL.

---

# 13. Deployment Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Vercel
 │
 ▼
Express REST API
 │
 ▼
Render / Railway
 │
 ▼
MongoDB Atlas
```

---

## Documentation Status

- [x] Project README
- [x] API Documentation
- [x] Authentication documentation
- [x] Doctor API documentation
- [x] Patient API documentation
- [x] Appointment API documentation
- [ ] Deployment documentation
- [ ] Production URLs
