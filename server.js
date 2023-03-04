import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();
import express from 'express';

//environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const port = process.env.PORT;

//setup web server
const app = express();

app.get('/', (req, res) => {
  return res.sendFile('index.html', {
    root: './frontend'
  })
})

app.listen(port, '0.0.0.0', (req, res) => {
  console.log(`Listening on port ${port}....`)
})

//setup discord bot
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const logInfo = true;
//change to false if logging is not desired


const commands = [
  {
    name: "catfact",
    description: "Get a cat fact from the cat fact database",
  },
];

const rest = new REST({ 
  version: "10" 
}).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`${client.user.tag} active`);
});

const getCatFact = async() => {
  const res = await fetch('https://meowfacts.herokuapp.com/')
  if (res.ok) {
    const catFact = await res.json()
    return catFact.data[0];
  } else {
    return '**Not a cat fact** An error has occured. Please contact Vic => https://vicontiveros00.github.io/#contact'
  }
}

const generateTimeStamp = () => {
  const currentTimeDate = new Date();
  return currentTimeDate.toString();
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "catfact") {
    logInfo &&
      console.log(`${interaction.user.name} requested a cat fact at ${generateTimeStamp()} in ${interaction.guild}`);
    await interaction.reply(await getCatFact());
  }
});

//ye

client.login(TOKEN);