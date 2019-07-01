const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcardData.json");
const { cards } = data;

router.get("/", (req, res) => {
  const randomcard = Math.floor(Math.random() * cards.length);
  res.redirect(`/card/${randomcard}?side=question`);
});

router.get("/:cardnumber", (req, res) => {
  const { cardnumber } = req.params;
  const { side } = req.query;
  const text = cards[cardnumber][side];
  const hint = side === "question" ? cards[cardnumber].hint : null;
  const name = req.cookies.username;

  const sideToShow = hint ? "answer" : "question";

  const templateData = { text, hint, cardnumber, sideToShow, name };
  if (side) {
    res.render("card", templateData);
  } else {
    res.redirect(`/card/${cardnumber}?side=question`);
  }
});

module.exports = router;
