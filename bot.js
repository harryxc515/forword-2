const { Telegraf, Markup } = require("telegraf");
const config = require("./config");
const connectDB = require("./database");
require("./server");

const bot = new Telegraf(config.BOT_TOKEN);

connectDB(config.MONGO_URI);

bot.start((ctx)=>{
ctx.reply(
`👋 Welcome ${ctx.from.first_name}

Use /name to send message to owner.`,
Markup.inlineKeyboard([
[Markup.button.callback("📖 Help","help")],
[Markup.button.url("📢 Support Channel",config.SUPPORT_CHANNEL)]
])
);
});

bot.action("help",(ctx)=>{
ctx.editMessageText(`
📜 Commands

/start - Start bot
/name - Send message to owner & sudo users
/help - Show commands
`);
});

bot.command("name",(ctx)=>{
ctx.reply("✍️ Send your message now:");
});

bot.on("text", async(ctx)=>{

if(ctx.message.text.startsWith("/")) return;

const username = ctx.from.username
? "@"+ctx.from.username
: ctx.from.first_name;

const message = ctx.message.text;

const text = `
📩 New User Message

👤 User: ${username}
🆔 ID: ${ctx.from.id}

💬 Message:
${message}
`;

await bot.telegram.sendMessage(config.OWNER_ID,text);

for(const sudo of config.SUDO_USERS){
await bot.telegram.sendMessage(sudo,text);
}

ctx.reply("✅ Message sent.");
});

bot.launch();

console.log("Bot Started");