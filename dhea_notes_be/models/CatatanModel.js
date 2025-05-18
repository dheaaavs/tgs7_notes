import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "catatan"
const Catatan = db.define(
  "catatan", // Nama Tabel
  {
    penulis: Sequelize.STRING,
    judul: Sequelize.STRING,
    isi: Sequelize.STRING,
  }
);

db.sync().then(() => console.log("Database synced"));

export default Catatan;