require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  OWNER_ID: process.env.OWNER_ID,
  SUDO_USERS: process.env.SUDO_USERS.split(","),
  SUPPORT_CHANNEL: process.env.SUPPORT_CHANNEL,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000
};