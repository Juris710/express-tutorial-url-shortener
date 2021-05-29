const express = require("express");
const path = require("path");
const crypto = require("crypto");
const app = express();

// body-parserの設定
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// "localhost:3000/"にアクセスしたときの処理
app.get("/", (req, res)=>{
  res.sendFile(path.resolve("index.html"));
})

// 生成した短縮URLのスラッグと実際のURLの紐づけるオブジェクト
const urls = {};

// 短縮URLの生成処理
app.post("/", (req, res)=>{
  // inputに入力された、短縮したいURLを取得
  const url = req.body.url;
  
  // ランダムな文字列を生成
  const slug = crypto.randomBytes(8).toString('hex');

  // 生成された文字列（スラッグ）と送られてきたURLを紐づけ
  urls[slug] = url;

  // 現在の短縮URLのスラッグと実際のURLの紐づけをログに出力
  console.log(urls);
  
  // 生成された短縮URLを送り返す
  res.send(`localhost:3000/${slug}`);
});

// 短縮URLにアクセスしたときの処理
app.get("/:slug", (req, res)=>{
  // スラッグを取得
  const slug = req.params.slug;

  // 実際のURLにリダイレクト
  res.redirect(urls[slug]);
});

// "Listening."と表示されると、"localhost:3000/"にアクセスできるようになる。
app.listen(3000, ()=>{console.log("Listening.")});