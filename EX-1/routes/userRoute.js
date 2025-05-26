import express from 'express';
import {
  getAllUsers,
  getAUser,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.route('/').get(getAllUsers).post(createUser);
userRoutes.route('/:id').get(getAUser).put(updateUser).delete(deleteUser);

export default users;