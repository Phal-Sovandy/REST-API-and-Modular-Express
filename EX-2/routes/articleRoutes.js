import express from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.js";

const articleRoutes = express.Router();

articleRoutes.route("/").get(getAllArticles).post(createArticle);
articleRoutes.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle);

export default articleRoutes;