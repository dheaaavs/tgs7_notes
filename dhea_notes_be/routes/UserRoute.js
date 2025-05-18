import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginHandler,
  logout
} from "../controllers/UserController.js";

import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//endpoint utk akses token
router.get('/token', refreshToken);

//endpoint utk autentikasi
router.post('/login', loginHandler);
router.delete('logout', logout);

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/add-user", createUser);
router.put("/edit-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
