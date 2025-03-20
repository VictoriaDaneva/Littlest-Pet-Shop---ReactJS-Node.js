import { Router } from "express";
import coffeeService from "../services/coffeeService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const cartController = Router();
//place an order
cartController.post("/order", isAuth, async (req, res) => {
  const { username, email, phoneNumber, address, total, products } = req.body;
  const userId = req.user._id;

  try {
    const newOrder = await coffeeService.createOrder({
      username,
      email,
      phoneNumber,
      address,
      total,
      products,
      owner: userId,
    });
    await coffeeService.clearCart(userId);
    return res.status(200).json(newOrder);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//removing teh product from the cart
cartController.get("/add/:id/remove", isAuth, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;

  try {
    const user = await coffeeService.removeCart(productId, userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//geting the product

cartController.get("/", isAuth, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await coffeeService.getCart(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Add to cart
cartController.get("/add/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    await coffeeService.addToCart(productId, userId);
    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

export default cartController;
