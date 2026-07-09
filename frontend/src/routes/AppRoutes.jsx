import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import AnalyticsList from "../pages/AnalyticsList";
import Settings from "../pages/Settings";
import PublicStats from "../pages/PublicStats";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics/:id"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Public Statistics */}
      {/* 1. Added base route option to successfully load the look-up page structure */}
      <Route
        path="/public"
        element={<PublicStats />}
      />

      {/* 2. Existing dynamic route option to show custom url details */}
      <Route
        path="/public/:shortCode"
        element={<PublicStats />}
      />
    </Routes>
  );
}

export default AppRoutes;