# Telegram Bad Language Cleaning Bot

## Introduction

This repository contains a simple Telegram bot designed to clean messages with inappropriate language in Telegram groups. The bot is capable of replacing offensive words with sanitized versions, ensuring a more pleasant and respectful environment for all group members.

## How It Works

When a user sends a message containing inappropriate language or offensive words, the bot will intercept the message and perform the necessary cleaning process. The original message will be replaced with a sanitized version where the offensive words are replaced with asterisks (**\***). This way, the context of the conversation is preserved while discouraging the use of inappropriate language.

## Example

Let's consider an example where a user named John sends the following message in a Telegram group:

```vbnet
John: I like big butt
```

Upon detecting the inappropriate language, the bot will intervene, and the message will be replaced with:

```vbnet
John: I like big **\***
```

## Deployment

To deploy this bot to your own Telegram group, follow these steps:

1. Clone this GitHub repository to your local machine.

```cmd
git clone https://github.com/Simple7575/moderator-bot.git
```

1. Create a new Telegram bot and obtain the API token from the BotFather.

2. Configure the bot by updating the API token in the .env file.

```env
#.env
BOT_TOKEN=<telegram bot token>
```

Install the required dependencies using npm.

```cmd
npm i
```

Run build and start

```cmd
npm run build
npm start
```

-   Add the bot to your Telegram group, and it will start
    cleaning messages automatically.

## Contributions

Contributions to this repository are welcome! If you encounter any bugs, have feature suggestions, or want to improve the bot's functionality, feel free to open an issue or submit a pull request. Together, we can make Telegram groups a cleaner and more enjoyable space for everyone.

## Disclaimer

Please note that this bot aims to promote a respectful environment in Telegram groups by filtering inappropriate language. However, it may not catch every offensive word, and false positives may occur. Use the bot responsibly and at your own discretion.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as permitted by the license.

I hope this bot helps foster a more positive and respectful atmosphere in your Telegram groups. If you have any questions or need assistance, please don't hesitate to contact us. Happy cleaning!
