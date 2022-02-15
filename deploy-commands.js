const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { SERVER_ID, BOT_ID } = require('./data/listId.json');
dotenv.config();

const commands = [];

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
const files = fs.readdirSync(path.resolve('./commands')).filter((file) => file.endsWith('.js'));

const command = require(`./commands/ping.js`);
commands.push(command.data.toJSON());

rest
  .put(Routes.applicationGuildCommands(BOT_ID, SERVER_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
