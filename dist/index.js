import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import profanity from "leo-profanity";
import dotenv from "dotenv";
//
import { start } from "./handlers/start.js";
dotenv.config();
const Token = process.env.BOT_TOKEN;
if (!Token)
    throw new Error("Bot Token needed.");
const bot = new Bot(Token);
bot.use(session({
    initial() {
        return {};
    },
    getSessionKey(ctx) {
        return ctx.from?.id.toString();
    },
}));
bot.use(conversations());
bot.command("start", start);
bot.on("message", async (ctx) => {
    try {
        if (profanity.check(ctx.message.text)) {
            const cleand = profanity.clean(ctx.message.text);
            await ctx.deleteMessage();
            ctx.reply(`${ctx.from.first_name} says \n"${cleand}"`);
        }
    }
    catch (error) {
        console.log(error);
    }
});
if (process.env.MODE === "Dev") {
    bot.start();
}
else {
    const WEB_URI = process.env.WEB_URI;
    if (!WEB_URI)
        throw new Error("Web URI needed");
    bot.api.setWebhook(`${WEB_URI}/bot${Token}`);
}
