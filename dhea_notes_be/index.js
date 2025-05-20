import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import CatatanRoute from "./routes/CatatanRoute.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());

// ✅ Konfigurasi CORS lengkap
const corsOptions = {
  origin: "https://e-13-450704.uc.r.appspot.com",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// ✅ Penting! Tangani preflight OPTIONS request
app.options("*", cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(CatatanRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
