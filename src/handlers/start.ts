import { ContextType } from "../../types/context";

export const start = async (ctx: ContextType) => {
    await ctx.reply("Hey");
};
