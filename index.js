const express = require("express");
const path = require("path");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res)=>{
  res.sendFile(path.resolve("index.html"));
})

const urls = {};

app.post("/", (req, res)=>{
  const url = req.body.url;
  const slug = crypto.randomBytes(8).toString('hex');
  urls[slug] = url;
  console.log(urls);
  res.send(`localhost:3000/${slug}`);
});

app.get("/:slug", (req, res)=>{
  const slug = req.params.slug;
  res.redirect(urls[slug]);
});

app.listen(3000, ()=>{console.log("Listening.")});