import OccasionSeo from "./pages/OccasionSeo";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";
import AuthCallback from "./pages/AuthCallback";
import AuthConfirmed from "./pages/AuthConfirmed";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import PublicReveal from "./pages/PublicReveal";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/auth/confirmed" element={<AuthConfirmed />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />

      <Route path="/wish/:websiteId" element={<PublicReveal />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route
  path="/birthday-surprise-website"
  element={
    <OccasionSeo slug="birthday-surprise-website" />
  }
/>

<Route
  path="/anniversary-surprise-website"
  element={
    <OccasionSeo slug="anniversary-surprise-website" />
  }
/>

<Route
  path="/proposal-website"
  element={
    <OccasionSeo slug="proposal-website" />
  }
/>

<Route
  path="/valentines-surprise"
  element={
    <OccasionSeo slug="valentines-surprise" />
  }
/>

<Route
  path="/friendship-surprise-website"
  element={
    <OccasionSeo slug="friendship-surprise-website" />
  }
/>

<Route
  path="/graduation-surprise-website"
  element={
    <OccasionSeo slug="graduation-surprise-website" />
  }
/>

<Route
  path="/farewell-surprise-website"
  element={
    <OccasionSeo slug="farewell-surprise-website" />
  }
/>

<Route
  path="/wedding-surprise-website"
  element={
    <OccasionSeo slug="wedding-surprise-website" />
  }
/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
