import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, "An image is requered!!"],
  },
  title: {
    type: String,
    required: [true, "The product tittle is requered!!"],
  },
  breed: {
    type: String,
    required: [true, "Price is requered!!"],
  },
  author: {
    type: String,
    required: [true, "The product type is requered!!"],
  },
  petType: {
    type: String,
    required: [true, "petType is requered!!"],
  },
  description: {
    type: String,
    required: [true, "Description is requered!!"],
  },

  likes: [
    {
      type: Types.ObjectId,
      ref: "Likes",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Product = model("Product", productSchema);
export default Product;
