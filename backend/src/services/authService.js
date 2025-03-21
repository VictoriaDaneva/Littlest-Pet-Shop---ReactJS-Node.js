import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";
import user from "../models/user.js";

const authService = {
  async getPosts(userId) {
    const User = await user.findById(userId).populate("posts");
    return User.posts;
  },
  async getWishlist(userId) {
    const User = await user.findById(userId).populate("wishlist");
    return User.wishlist;
  },
  async editProfile(userId, userData) {
    return user.findByIdAndUpdate(userId, userData, {
      runValidators: true,
      new: true,
    });
  },
  async getProfile(userId) {
    return user.findOne({ _id: userId }, { password: 0, __v: 0 }).lean();
  },

  async register(imageUrl, username, email, phoneNumber, address, password) {
    const User = await user.findOne({ $or: [{ email }, { username }] });

    if (User) {
      throw new Error("User already exists!!!");
    }
    const newUser = await user.create({
      imageUrl,
      username,
      email,
      phoneNumber,
      address,
      password,
    });
    return this.generateToken(newUser);
  },

  async login(email, password) {
    const User = await user.findOne({ email });

    if (!User) {
      throw new Error("Invalid user!");
    }

    const valid = await bcrypt.compare(password, User.password);

    if (!valid) {
      throw new Error("Invalid password!!!");
    }

    return this.generateToken(User);
  },

  async generateToken(User) {
    //token
    const payload = {
      _id: User._id,
      email: User.email,
      username: User.username,
    };

    const header = { expiresIn: "2h" };
    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, header);
    return { User, accessToken };
  },
};

export default authService;
