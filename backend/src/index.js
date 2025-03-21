import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Angular dev server
    credentials: true, // Allow cookies and authentication headers
  })
);

//setup db
const url = "mongodb://localhost:27017";
mongoose
  .connect(url, { dbName: "Pets" })
  .then(console.log(`DB Connected!`))
  .catch((err) => console.log(`DB Failed! ${err}`)); //setup the name based on the project

//app.use("/static", express.static("src/public")); //remove the dots
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: false })); // to not have complex data (false)
app.use(cookieParser());
app.use(authMiddleware);
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  next();
});
app.use(routes);

app.listen(PORT, () =>
  console.log(`server is running on http//localhost:${3000}`)
);
