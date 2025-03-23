import { Router } from "express";
import authService from "../services/authService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { authMiddleware, isAuth } from "../middleware/authMiddleware.js";

const profileController = Router();

//get the user's posts
profileController.get("/posts", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.getPosts(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get the user's wishlist
profileController.get("/wishlist", isAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.getWishlist(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Get Profile
profileController.get("/:userId", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await authService.getProfile(userId);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedData = {
      ...data,
      _id: data._id.toString(),
    };

    return res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Update Profile
profileController.post("/edit", isAuth, async (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  try {
    const data = await authService.editProfile(userId, userData);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

export default profileController;
