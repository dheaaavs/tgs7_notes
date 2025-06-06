import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import CatatanRoute from "./routes/CatatanRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./config/Database.js";

dotenv.config();

const app = express();
app.set("view engine", "ejs");

// Daftar origin yang diizinkan
const allowedOrigins = ['https://dhea-notes-dot-e-13-450704.uc.r.appspot.com'];
console.log("Allowed origins:", allowedOrigins);

app.use(cookieParser());

app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => res.render("index"));

app.use(UserRoute);
app.use(CatatanRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();

    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
