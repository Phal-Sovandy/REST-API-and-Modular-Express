import express from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getArticleByCategory,
} from "../controllers/category.js";

const categoryRoutes = express.Router();

categoryRoutes.route("/").get(getAllCategories).post(createCategory);
categoryRoutes
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
categoryRoutes.route("/:id/articles").get(getArticleByCategory);

export default categoryRoutes;
