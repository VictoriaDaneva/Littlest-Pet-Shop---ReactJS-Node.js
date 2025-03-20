import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  total: {
    type: String,
    required: [true, "Price is requered!!"],
  },

  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Products",
    },
  ],
});

const Order = model("Order", orderSchema);
export default Order;
