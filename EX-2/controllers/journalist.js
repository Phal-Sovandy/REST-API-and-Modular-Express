import { journalists, articles } from "../models/data.js";
function getAllJournalists(req, res) {
  res.status(200).json(journalists);
}
function getJournalist(req, res) {
  const { id } = req.params;
  try {
    const journalist = journalists.find((jrl) => jrl.id === Number(id));
    if (journalist) {
      return res.status(200).json(journalist);
    }
    return res.status(404).send(`Journalist with ID: "${id}" NOT found!`);
  } catch (err) {
    return res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function createJournalist(req, res) {
  const { name, email } = req.body;
  const newId = journalists[journalists.length - 1].id + 1;
  const newJournalist = { id: newId };
  if (!name || name.trim().length === 0)
    return res.status(400).send("Invalid/Empty Input of NAME");

  newJournalist.name = name.trim();

  if (!email || email.trim().length === 0 || !email.includes("@"))
    return res.status(400).send("Invalid/Empty Input of email");

  newJournalist.email = email.trim();

  journalists.push(newJournalist);
  return res.status(202).json(newJournalist);
}
function updateJournalist(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const journalist = journalists.find((jrl) => jrl.id === Number(id));
    if (journalist) {
      if (name) if (name.trim().length > 0) journalist.name = name.trim();
      if (email) if (email.trim().includes("@")) journalist.email = email.trim();
      return res.status(200).json(journalist);
    }
    return res.status(404).send(`Journalist with ID: "${id}" NOT found!`);
  } catch (err) {
    return res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function deleteJournalist(req, res) {
  const { id } = req.params;
  try {
    const journalistIndex = journalists.findIndex(
      (jrl) => jrl.id === Number(id)
    );
    if (journalistIndex === -1) {
      return res.status(404).send(`Journalist with ID: "${id}" NOT found!`);
    }
    journalists.splice(journalistIndex, 1);
    return res.status(200).send(`Journalist with ID: "${id}" is deleted!`);
  } catch (err) {
    return res.status(500).send(`Internal Server is error: ${err}`);
  }
}
function getArticleByJournalist(req, res) {
  const { id } = req.params;
  try {
    const foundArticles = articles.filter(
      (article) => article.journalistId === Number(id)
    );
    foundArticles.length > 0
      ? res.status(200).json(foundArticles)
      : res
          .status(404)
          .send(`Article written by Journalist with ID: "${id}" NOT found!`);
  } catch (err) {
    return res.status(500).send(`Internal Server is error: ${err}`);
  }
}

export {
  getAllJournalists,
  getJournalist,
  createJournalist,
  updateJournalist,
  deleteJournalist,
  getArticleByJournalist,
};
