const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("here");
});

app.post("/shortUrl", async (req, res) => {
  await ShortUrl.create({ fullUrl: req.body.fullUrl });

  res.redirect("/");
});

app.listen(5000);
