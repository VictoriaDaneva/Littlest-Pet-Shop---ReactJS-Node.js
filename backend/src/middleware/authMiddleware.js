import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    req.isAuthenticated = true;
    return next();
  } catch (err) {
    res.clearCookie(AUTH_COOKIE_NAME);
    console.log(err);
    return next();
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
