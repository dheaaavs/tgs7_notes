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
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(CatatanRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
