import { Router } from "express";
import coffeeService from "../services/petsService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const coffeeController = Router();

//Search
coffeeController.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const search = await coffeeService.search(query);
    res.status(200).json(search);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Remove from wishlist
coffeeController.get("/:id/like/unsub", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    await coffeeService.unlike(productId, userId);
    await coffeeService.removeWishlistUser(productId, userId);
    res.status(200).json({ message: "Product is unliked successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Add to wishlist
coffeeController.get("/:id/like", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await coffeeService.like(productId, userId);
    await coffeeService.addToWishlistUser(productId, userId);
    res.status(200).json({ message: "Product is liked successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Delete a post
coffeeController.delete("/:id", checkIsOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await coffeeService.removeFromUserProduct(userId, productId);
    await coffeeService.removeProduct(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Edit a post
coffeeController.post("/:id/edit", checkIsOwner, async (req, res) => {
  const productId = req.params.id;
  const coffeeParams = req.body;
  try {
    const data = await coffeeService.editProduct(coffeeParams, productId);
    return res.json(data);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Details
coffeeController.get("/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const data = await coffeeService.getOne(productId);
    return res.json(data);
  } catch (err) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Catalog
coffeeController.get("/", async (req, res) => {
  try {
    const data = await coffeeService.getAll();
    return res.json(data);
  } catch (err) {
    console.error(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Post a product
coffeeController.post("/", isAuth, async (req, res) => {
  const coffeeData = req.body;
  const userId = req.user;

  try {
    const createdProduct = await coffeeService.create(coffeeData, userId);
    await coffeeService.addPostToUser(userId, createdProduct._id);
    return res.status(201).json({ data: createdProduct });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

async function isOwner(req, res, next) {
  let product = await coffeeService.getOne(req.params.id);

  if (product.owner == req.user._id) {
    res.status(404);
  } else {
    next();
  }
}

async function checkIsOwner(req, res, next) {
  let product = await coffeeService.getOne(req.params.id);

  if (product.owner == req.user._id) {
    next();
  } else {
    res.status(404);
  }
}
export default coffeeController;
