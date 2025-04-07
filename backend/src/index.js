import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const url = "mongodb://localhost:27017";
mongoose
  .connect(url, { dbName: "Pets" })
  .then(console.log(`DB Connected!`))
  .catch((err) => console.log(`DB Failed! ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  next();
});
app.use(routes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
