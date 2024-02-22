const express = require("express");
const router = express.Router();
const { login, register, forgotPassword, resetPassword, firebaseLogin, getAllUser } = require("../controllers/userController");
const { firebaseAuthUser } = require("../middleware/firebaseAuthUser");

router.get("/", getAllUser);
router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/login-firebase", firebaseAuthUser, firebaseLogin);
module.exports = router;
