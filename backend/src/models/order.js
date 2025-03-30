import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  adoptionDate: {
    type: String,
    required: [true, "Adoption Date is required!"],
  },
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
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
