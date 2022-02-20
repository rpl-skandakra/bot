require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

// Find required files
const eventFiles = fs.readdirSync(path.resolve('./events')).filter((file) => file.endsWith('.js'));
const commandFiles = fs.readdirSync(path.resolve('./commands/slash')).filter((file) => file.endsWith('.js'));

// Register commands
client.commands = new Collection();
commandFiles.map((file) => {
  const command = require(`./commands/slash/${file}`);
  client.commands.set(command.name, command);
});

// Register events
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args));
}

// Login bot
client.login(process.env.BOT_TOKEN);
