const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: (message, client) => {
    message.reply(`🏓 **Pong!** \`${client.ws.ping}ms\`.`);
  },
};
