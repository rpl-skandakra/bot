require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { BOT_ID, BOT_TOKEN, SERVER_ID } = process.env;

const commands = [];

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);
const files = fs.readdirSync(path.resolve('./commands')).filter((file) => file.endsWith('.js'));

const command = require(`./commands/ping.js`);
commands.push(command.data.toJSON());

rest
  .put(Routes.applicationGuildCommands(BOT_ID, SERVER_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);