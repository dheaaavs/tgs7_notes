import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import CatatanRoute from "./routes/CatatanRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

// Aktifkan cookie parser
app.use(cookieParser());

const corsOptions = {
  origin: "https://e-13-450704.uc.r.appspot.com",
  credentials: true,
};
app.use(cors(corsOptions));


app.options("*", cors(corsOptions));
app.use(express.json());

// Route
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(CatatanRoute);

// ✅ Gunakan PORT dari environment (Cloud Run default ke 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
