const express = require("express");
const config = require("./config");

const app = express();

app.get("/", (req,res)=>{
  res.send("Telegram Bot is Running 🚀");
});

app.listen(config.PORT, ()=>{
  console.log("Server running on port " + config.PORT);
});