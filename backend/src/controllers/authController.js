import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isGuest } from "../middleware/authMiddleware.js";

const authController = Router();

// Register
authController.post("/register", isGuest, async (req, res) => {
  try {
    const {
      imageUrl,
      username,
      email,
      phoneNumber,
      address,
      password,
      rePassword,
    } = req.body;
    const { User, token } = await authService.register(
      imageUrl,
      username,
      email,
      phoneNumber,
      address,
      password,
      rePassword
    );
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(201).json({ User, token });
  } catch (err) {
    const error = getErrrorMessage(err);
    console.log(err);

    return res.status(400).json({ message: error });
  }
});

// Login
authController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { User, token } = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ User, token });
  } catch (err) {
    const error = getErrrorMessage(err);
    console.log(err);

    res.status(400).json({ message: error });
  }
});

// Logout
authController.post("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Logout successful" });
});

export default authController;
