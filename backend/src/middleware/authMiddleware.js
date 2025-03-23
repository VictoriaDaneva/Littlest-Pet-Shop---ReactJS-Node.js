import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME] || req.headers["x-authorization"];

  if (!token) {
    console.warn("No authentication token found");
    next();
    return;
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken._id;
    req.isAuthenticated = true;
    console.log("Authenticated User:", req.user);
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
};

export const isGuest = (req, res, next) => {
  if (req.user) {
    return res
      .status(403)
      .json({ message: "Forbidden for authenticated users" });
  }
  next();
};
