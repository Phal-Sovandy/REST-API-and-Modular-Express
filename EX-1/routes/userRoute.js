import express from 'express';
import validator from '../middleware/validator.js';
import {
  getAllUsers,
  getAUser,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.route('/').get(getAllUsers);
userRoutes.post('/', validator, createUser)
userRoutes.route('/:id').get(getAUser).put(updateUser).delete(deleteUser);

export default userRoutes;