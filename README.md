# Cat facts!

Discord.js bot that returns a cat fact from the [MeowFacts API](https://meowfacts.herokuapp.com/) and sends it as a message to your server.

Bot is now live. You can invite my instance of the bot [here](https://discord.com/api/oauth2/authorize?client_id=1075769145909588041&permissions=2048&scope=bot).

## Usage
Ensure the bot has permission to send messages in a given channel. The slash command to get a cat fact is `/catfact`. 

## Developer Usage

At root directory, create a `.env` file containing
- Desired port to run the bot
- Discord Bot token
- Discord Client ID

Run `npm install` at root to install necessary dependencies.

Run `npm run dev` to start a development version of the server. (Auto restarts the server upon file change)

Run `npm run start` to run the server normally.

### server.js
On line 29 exists a variable `logInfo`. If true, each interaction, the user that called the interaction, the time stamp, and the guild will be logged to the console. If logging is not desired, change `logInfo` to `false`.