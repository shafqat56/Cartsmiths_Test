const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
const quotes = [
  {
    id: 1,
    text: "people who have no hold over their process of thinking ara likely to be ruined by liberty of thought.",
  },
  {
    id: 2,
    text: "Nations are born in the hearts of poets, they prosper and die in the hands of politicians.",
  },
  {
    id: 3,
    text: "Failure is not fatal until we surrender trying again is the key of glorious victory.",
  },
  {
    id: 4,
    text: "My ancestors were Brahmins. They spent their lives in search of god. I am spending my life in search of man.",
  },
  {
    id: 5,
    text: "Ki Muhammad se wafa toonay to ham teray hain Ye jahan cheez hai kiya lauho qalam tere hain",
  },
];

app.post("/quotes", (req, res) => {
  const { ratings } = req.body;

  quotes.forEach((quote, index) => {
    quote.rating = ratings[index];
  });

  res.status(201).send({ message: "Ratings updated successfully", quotes });
});

app.get("/quotes", (req, res) => {
  res.json(quotes);
});

app.listen(PORT, () =>
  console.log(`Server has Stated`)
);
