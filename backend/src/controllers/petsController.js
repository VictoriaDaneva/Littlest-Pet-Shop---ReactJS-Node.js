import { Router } from "express";
import petsService from "../services/petsService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const petsController = Router();

//Search
petsController.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const search = await petsService.search(query);
    res.status(200).json(search);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Remove from wishlist
petsController.get("/:id/like/unsub", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    await petsService.unlike(productId, userId);
    await petsService.removeWishlistUser(productId, userId);
    res.status(200).json({ message: "Product is unliked successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Add to wishlist
petsController.get("/:id/like", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await petsService.like(productId, userId);
    await petsService.addToWishlistUser(productId, userId);
    res.status(200).json({ message: "Product is liked successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Delete a post
petsController.delete("/:id", checkIsOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await petsService.removeFromUserProduct(userId, productId);
    await petsService.removeProduct(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});
//Edit a post
petsController.put("/:id/edit", async (req, res) => {
  const productId = req.params.id;
  const petParams = req.body;
  try {
    const data = await petsService.editProduct(petParams, productId);
    return res.json(data);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Details
petsController.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const data = await petsService.getOne(productId).populate("owner");
    return res.json(data);
  } catch (err) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Catalog
petsController.get("/", async (req, res) => {
  try {
    const data = await petsService.getAll();
    return res.json(data);
  } catch (err) {
    console.error(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Post a product
petsController.post("/", isAuth, async (req, res) => {
  const petData = req.body;
  const userId = req.user;

  try {
    const createdProduct = await petsService.create(petData, userId);
    await petsService.addPostToUser(userId, createdProduct._id);
    return res.status(201).json({ data: createdProduct });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

async function isOwner(req, res, next) {
  let product = await petsService.getOne(req.params.id);

  if (product.owner == req.user._id) {
    res.status(404);
  } else {
    next();
  }
}

async function checkIsOwner(req, res, next) {
  let product = await petsService.getOne(req.params.id);

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: No user ID found" });
  }

  if (product.owner.toString() === req.user._id) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Not the owner" });
  }
}
export default petsController;
