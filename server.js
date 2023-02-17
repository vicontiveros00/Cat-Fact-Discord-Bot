import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
config();

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const CLIENT_ID = process.env.CLIENT_ID;

const TOKEN = process.env.TOKEN;

const port = process.env.PORT || "8080";
//here so fly doesnt yell at me

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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "catfact") {
    await interaction.reply(await getCatFact());
  }
});

client.login(TOKEN);