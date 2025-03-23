import { Router } from "express";
import authController from "./controllers/authController.js";
import coffeeController from "./controllers/petsController.js";
import profileController from "./controllers/profileController.js";
import cartController from "./controllers/cartController.js";

const routes = Router();

routes.use("/api/cart", cartController);
routes.use("/api/users/profile", profileController);
routes.use("/api", authController);
routes.use("/api/products", coffeeController);

export default routes;
