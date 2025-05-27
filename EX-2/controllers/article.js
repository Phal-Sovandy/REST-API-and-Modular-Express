import { articles, journalists, categories } from "../models/data.js";

function getAllArticles(req, res) {
  res.status(200).json(articles);
}
function getArticle(req, res) {
  const { id } = req.params;
  try {
    const article = articles.find((art) => art.id === Number(id));
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).send(`Article with ID: "${id}" NOT found!`);
    }
  } catch (err) {
    res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function createArticle(req, res) {
  let { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId)
    res
      .status(400)
      .send("Missing input(s) TITLE, CONTENT, JOURNALIST ID, CATEGORY ID");
  try {
    title = title.trim();
    content = content.trim();
    const journalistIdValid = journalists.findIndex(
      (journalist) => journalist.id === Number(journalistId)
    );
    const categoryIdValid = categories.findIndex(
      (category) => category.id === Number(categoryId)
    );

    if (title.length === 0 || content.length === 0) {
      res.status(400).send("Invalid/Empty Input of TITLE or Content");
    } else if (journalistIdValid === -1 || categoryIdValid === -1) {
      res.status(400).send("Invalid JournalistID or CategoryID");
    } else {
      const newArticleID = articles[articles.length - 1].id + 1;
      const newArticle = {
        id: newArticleID,
        title: title,
        content: content,
        journalistId: journalistId,
        categoryId: categoryId,
      };
      articles.push(newArticle);
      res.status(202).json(newArticle);
    }
  } catch (err) {
    res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function updateArticle(req, res) {
  const { id } = req.params;
  const { title, content, journalistId, categoryId } = req.body;
  try {
    const article = articles.find((art) => art.id === Number(id));

    if (article) {
      if (journalistId) {
        const journalistIdValid = journalists.findIndex(
          (journalist) => journalist.id === journalistId
        );
        if (journalistIdValid === -1)
          return res
            .status(400)
            .send(`Invalid JournalistID: "${journalistId}"`);
        article.journalistId = journalistId;
      }
      if (categoryId) {
        const categoryIdValid = categories.findIndex(
          (category) => category.id === categoryId
        );
        if (categoryIdValid === -1)
          return res.status(400).send(`Invalid CategoryID: "${categoryId}"`);
        article.categoryId = categoryId;
      }
      if (title) {
        if (title.trim() === 0) article.title = title.trim();
      }
      if (content) {
        if (content.trim() === 0) article.content = content.trim();
      }
      return res.status(202).json(article);
    } else {
      return res.status(404).send(`Article with ID: "${id}" NOT found!`);
    }
  } catch (err) {
    res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function deleteArticle(req, res) {
  const { id } = req.params;
  try {
    const articleIndex = articles.findIndex((art) => art.id === Number(id));
    if (articleIndex === -1) {
      return res.status(404).send(`Article with ID: "${id}" NOT found!`);
    }
    articles.splice(articleIndex, 1);
    return res.status(200).send(`Article with ID: "${id}" is deleted!`);
  } catch (err) {
    res.status(500).send(`Internal Server is error: ${err}`);
  }
}

export {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
