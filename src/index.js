require("dotenv/config");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { loadCommands } = require("./Handlers/commandHandler");
const { loadEvents } = require("./Handlers/eventHandler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.offers = new Collection();

(async () => {
  try {
    await client.login(process.env.BOT_TOKEN).then(() => {
      loadEvents(client);
      loadCommands(client);
    });
  } catch (err) {
    console.log(err);
  }
})();
