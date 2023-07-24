import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
//  handlers
import { start } from "../handlers/start.js";
import { cleanLanguage } from "../handlers/cleanLanguage.js";
//
import { BOT_TOKEN } from "../constants.js";
// types
import { type ContextType, type ApiType } from "../../types/context";

if (!BOT_TOKEN) throw new Error("Bot Token needed.");
const bot = new Bot<ContextType, ApiType>(BOT_TOKEN);

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
bot.on("message", cleanLanguage);

export { bot };
