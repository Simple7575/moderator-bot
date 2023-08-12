import { ContextType } from "../types/context";

export const start = async (ctx: ContextType) => {
    try {
        await ctx.reply("Hey");
    } catch (error) {
        console.error(error);
    }
};
