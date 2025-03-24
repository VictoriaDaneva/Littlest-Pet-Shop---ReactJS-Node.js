import Order from "../models/order.js";
import Product from "../models/product.js";
import user from "../models/user.js";

const petsService = {
  search(query) {
    return Product.find({ title: { $regex: query, $options: "i" } });
  },
  //Cart functionality
  clearCart(userId) {
    return user.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true, runValidators: true }
    );
  },

  createOrder(orderData) {
    return Order.create(orderData);
  },
  removeCart(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: productId } },
      { runValidators: true, new: true }
    );
  },

  async getCart(userId) {
    const User = await user.findById(userId).populate("cart");
    return User.cart;
  },

  addToCart(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { cart: productId } },
      { new: true, runValidators: true }
    );
  },

  //Wishlist Functionality
  removeWishlistUser(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { wishlist: productId } },
      { runValidators: true, new: true }
    );
  },

  unlike(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $pull: { likes: userId } },
      { runValidators: true, new: true }
    );
  },

  addToWishlistUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
      { new: true, runValidators: true }
    );
  },

  like(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $push: { likes: userId } },
      { new: true, runValidators: true }
    );
  },

  //CRUD Operations

  removeFromUserProduct(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $pull: { products: productId } }, // Pull productId from products array
      {
        runValidators: true,
        new: true, // Return the updated document
      }
    );
  },

  removeProduct(productId) {
    return Product.findByIdAndDelete(productId);
  },

  editProduct(petParams, productId) {
    return Product.findByIdAndUpdate(productId, petParams, {
      runValidators: true,
      new: true,
    });
  },

  getOne(productId) {
    return Product.findById(productId).lean();
  },

  getAll() {
    return Product.find();
  },

  addPostToUser(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { posts: productId } },
      { new: true, runValidators: true }
    );
  },

  create(petData, userId) {
    return Product.create({ ...petData, owner: userId });
  },
};

export default petsService;
