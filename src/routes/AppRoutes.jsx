import React from "react";
import { Routes, Route } from "react-router-dom";

// =====================================================
// AUTH
// =====================================================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// =====================================================
// PUBLIC
// =====================================================
import Home from "../pages/public/Home";
import DepartmentDetails from "../pages/DepartmentDetails";

// =====================================================
// COMMON
// =====================================================
import NotFound from "../pages/common/NotFound";
import Notifications from "../pages/common/Notifications";
import Search from "../pages/common/Search";
import Unauthorized from "../pages/common/Unauthorized";

// =====================================================
// LAYOUTS
// =====================================================
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

// =====================================================
// ADMIN
// =====================================================
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAppointments from "../pages/admin/Appointments";
import AdminDepartments from "../pages/admin/Departments";
import AdminDoctors from "../pages/admin/Doctors";
import AdminPatients from "../pages/admin/Patients";
import AdminProfile from "../pages/admin/Profile";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";

// =====================================================
// DOCTOR
// =====================================================
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import Consultation from "../pages/doctor/Consultation";
import DoctorPrescriptions from "../pages/doctor/Prescriptions";
import DoctorProfile from "../pages/doctor/Profile";

// =====================================================
// PATIENT
// =====================================================
import PatientDashboard from "../pages/patient/Dashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import AppointmentHistory from "../pages/patient/AppointmentHistory";
import PatientPrescriptions from "../pages/patient/Prescriptions";
import PatientProfile from "../pages/patient/Profile";

// =====================================================
// ROUTES
// =====================================================
const AppRoutes = () => {
  return (
    <Routes>
      {/* =================================================
          LANDING
      ================================================= */}
      <Route path="/" element={<Home />} />

      {/* =================================================
          PUBLIC DEPARTMENT DETAILS
      ================================================= */}
      <Route path="/departments/:id" element={<DepartmentDetails />} />

      {/* =================================================
          AUTH
      ================================================= */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* =================================================
          COMMON
      ================================================= */}
      <Route path="/notifications" element={<Notifications />} />

      <Route path="/search" element={<Search />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* =================================================
          ADMIN
      ================================================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="appointments" element={<AdminAppointments />} />

        <Route path="departments" element={<AdminDepartments />} />

        <Route path="doctors" element={<AdminDoctors />} />

        <Route path="patients" element={<AdminPatients />} />

        <Route path="profile" element={<AdminProfile />} />

        <Route path="reports" element={<AdminReports />} />

        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* =================================================
          DOCTOR
      ================================================= */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />

        <Route path="dashboard" element={<DoctorDashboard />} />

        <Route path="appointments" element={<DoctorAppointments />} />

        {/* CONSULTATION */}
        <Route path="consultation/:appointmentId" element={<Consultation />} />

        {/* PRESCRIPTION */}
        <Route
          path="prescription/:appointmentId"
          element={<DoctorPrescriptions />}
        />

        <Route path="prescriptions" element={<DoctorPrescriptions />} />

        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* =================================================
          PATIENT
      ================================================= */}
      <Route path="/patient" element={<PatientLayout />}>
        {/* /patient */}
        <Route index element={<PatientDashboard />} />

        {/* /patient/dashboard */}
        <Route path="dashboard" element={<PatientDashboard />} />

        {/* /patient/book-appointment */}
        <Route path="book-appointment" element={<BookAppointment />} />

        {/* /patient/my-appointments */}
        <Route path="my-appointments" element={<MyAppointments />} />

        {/* /patient/appointments
            Kept for compatibility */}
        <Route path="appointments" element={<MyAppointments />} />

        {/* /patient/appointment-history */}
        <Route path="appointment-history" element={<AppointmentHistory />} />

        {/* /patient/prescriptions */}
        <Route path="prescriptions" element={<PatientPrescriptions />} />

        {/* /patient/profile */}
        <Route path="profile" element={<PatientProfile />} />
      </Route>

      {/* =================================================
          FALLBACK
      ================================================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
