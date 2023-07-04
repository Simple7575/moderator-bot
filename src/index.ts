import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import profanity from "leo-profanity";
import dotenv from "dotenv";
//
import { start } from "./handlers/start.js";
// types
import { type ContextType, type ApiType } from "../types/context";

dotenv.config();

const Token = process.env.BOT_TOKEN;
if (!Token) throw new Error("Bot Token needed.");
const bot = new Bot<ContextType, ApiType>(Token);

bot.use(
    session({
        initial() {
            return {};
        },
        getSessionKey(ctx) {
            return ctx.from?.id.toString();
        },
    })
);
bot.use(conversations());

bot.command("start", start);
bot.on("message", async (ctx) => {
    try {
        if (profanity.check(ctx.message.text!)) {
            const cleand = profanity.clean(ctx.message.text!);

            await ctx.deleteMessage();
            ctx.reply(`${ctx.from.first_name} says \n"${cleand}"`);
        }
    } catch (error) {
        console.log(error);
    }
});

bot.start();
