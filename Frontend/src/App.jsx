import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchRide from "./pages/SearchRide";
import PostRide from "./pages/PostRide";
import MyRides from "./pages/MyRides";
import EditRide from "./pages/EditRide";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import HelpCenter from "./pages/HelpCenter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchRide />} />
        <Route path="/post" element={<PostRide />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/edit-ride/:id" element={<EditRide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
