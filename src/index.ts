import { webhookCallback } from "grammy";
import express from "express";
import cors from "cors";
import helmet from "helmet";
//
import { bot } from "./bot/bot.js";
import { BOT_TOKEN, PORT, WEB_URI, MODE } from "./constants.js";
import botRouter from "./bot/route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(`/${BOT_TOKEN}`, webhookCallback(bot, "express"));

app.get("/", (req, res) => {
    res.status(200).send("Welcome");
});

app.use("/bot", botRouter);

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    if (MODE === "Dev") {
        bot.start();
    } else {
        if (!BOT_TOKEN) throw new Error("Bot Token needed.");
        if (!WEB_URI) throw new Error("Web URI needed");
        await bot.api.setWebhook(`${WEB_URI}/${BOT_TOKEN}`, {
            drop_pending_updates: true,
        });
        // await bot.api.setWebhook(`${WEB_URI || "http://localhost:5000"}/bot/bot${BOT_TOKEN}`, {
        //     drop_pending_updates: true,
        // });
    }
});
