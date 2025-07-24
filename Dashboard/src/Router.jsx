import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import App from "./App";
import {
  Dashboard,
  ViewDepartments,
  Invoices,
  AboutUsForm,
  Form,
  ViewDoctors,
  PhotoForm,
  ViewPhotos,
  ViewHero,
  ViewServices,
  Pie,
  Links,
  Contact,
} from "./scenes";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />

          {/* Dashboard routes */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/departments"
              element={
                <ProtectedRoute>
                  <ViewDepartments />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AboutUsForm />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />

            <Route
              path="/view-doctors"
              element={
                <ProtectedRoute>
                  {" "}
                  <ViewDoctors />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-photos"
              element={
                <ProtectedRoute>
                  {" "}
                  <PhotoForm />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/view-photos"
              element={
                <ProtectedRoute>
                  {" "}
                  <ViewPhotos />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact-us"
              element={
                <ProtectedRoute>
                  {" "}
                  <Contact />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/hero"
              element={
                <ProtectedRoute>
                  {" "}
                  <ViewHero />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  {" "}
                  <ViewServices />{" "}
                </ProtectedRoute>
              }
            />

            <Route
              path="/links"
              element={
                <ProtectedRoute>
                  {" "}
                  <Links />{" "}
                </ProtectedRoute>
              }
            />

           
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;

