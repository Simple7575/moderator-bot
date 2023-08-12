import { webhookCallback } from "grammy";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import axios from "axios";
//
import { bot } from "./bot/bot.js";
import { BOT_TOKEN, PORT, WEB_URI, MODE, URI_TO_WAKE } from "./constants.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(`/${BOT_TOKEN}`, webhookCallback(bot, "express"));

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

app.get("/wake", async (req, res) => {
    try {
        if (!URI_TO_WAKE) {
            console.error("Please provide uri to wake");
            res.status(400).json({ message: "Please provide uri to wake" });
            return;
        }

        const axiosResponse = await axios.get(URI_TO_WAKE);
        res.status(200).json({ msessage: "Uri call for wake it" });
        console.log(axiosResponse.data);
    } catch (error) {
        res.status(500).json({ messagte: "Something went wrong" });
        if (error instanceof Error) console.error(error.message);
    }
});

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    if (MODE?.toLocaleLowerCase() === "dev") {
        bot.start();
    } else {
        if (!BOT_TOKEN) throw new Error("Bot Token needed.");
        if (!WEB_URI) throw new Error("Web URI needed");
        await bot.api.setWebhook(`${WEB_URI}/${BOT_TOKEN}`, {
            drop_pending_updates: true,
        });
    }
});
