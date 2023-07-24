import profanity from "leo-profanity";
// types
import { ContextType } from "../../types/context";

export const cleanLanguage = async (ctx: ContextType) => {
    const message = ctx.message!;
    try {
        if (profanity.check(message.text!)) {
            const cleand = profanity.clean(message.text!);

            await ctx.deleteMessage();
            ctx.reply(`${ctx.from!.first_name} says \n"${cleand}"`);
        }
    } catch (error) {
        console.error(error);
    }
};
