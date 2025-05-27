import express from "express";
import {
  getAllJournalists,
  getJournalist,
  createJournalist,
  updateJournalist,
  deleteJournalist,
  getArticleByJournalist,
} from "../controllers/journalist.js";

const journalistRoutes = express.Router();

journalistRoutes.route('/').get(getAllJournalists).post(createJournalist);
journalistRoutes.route('/:id').get(getJournalist).put(updateJournalist).delete(deleteJournalist);
journalistRoutes.route('/:id/articles').get(getArticleByJournalist);

export default journalistRoutes;