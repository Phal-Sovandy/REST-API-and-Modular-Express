import { categories, articles } from "../models/data.js";

function getAllCategories(req, res) {
  res.status(200).json(categories);
}
function getCategory(req, res) {
  const { id } = req.params;
  try {
    const category = categories.find((cat) => cat.id === Number(id));
    if (category) {
      return res.status(200).json(category);
    } else {
      return res.status(404).send(`Category with ID: "${id}" NOT found!`);
    }
  } catch (err) {
    return res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function createCategory(req, res) {
  const { name } = req.body;
  const newId = categories[categories.length - 1].id + 1;
  if (!name || name.trim().length === 0)
    return res.status(400).send("Invalid/Empty Input of NAME");

  const newCategory = { id: newId, name: name.trim() };

  categories.push(newCategory);
  return res.status(202).json(newCategory);
}
function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || name.trim().length === 0)
    return res.status(400).send("Invalid/Empty Input of NAME");
  try {
    const category = categories.find((cat) => cat.id === Number(id));
    if (category) {
      category.name = name.trim();
      return res.status(200).json(category);
    }
    return res.status(500).send(`Category with ID: "${id}" NOT found!`);
  } catch (err) {
    return res.status(401).send(`Internal Server is error: ${err}`);
  }
}
function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    const categoryIndex = categories.findIndex((jrl) => jrl.id === Number(id));
    if (categoryIndex === -1) {
      return res.status(500).send(`Category with ID: "${id}" NOT found!`);
    }
    categories.splice(categoryIndex, 1);
    return res.status(200).send(`Category with ID: "${id}" is deleted!`);
  } catch (err) {
    return res.status(401).send(`Internal Server is error: ${err}`);
  }
}
function getArticleByCategory(req, res) {
  const { id } = req.params;
  try {
    const foundArticles = articles.filter(
      (article) => article.categoryId === Number(id)
    );
    foundArticles.length > 0
      ? res.status(200).json(foundArticles)
      : res.status(500).send(`Article with Category ID: "${id}" NOT found!`);
  } catch (err) {
    return res.status(401).send(`Internal Server is error: ${err}`);
  }
}

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getArticleByCategory,
};
