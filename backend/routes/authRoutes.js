const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTPAndRegister, loginUser, forgotPassword, verifyResetOtp, resetPassword } = require("../controllers/authController");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router; 