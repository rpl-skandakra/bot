const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: (message, client) => {
    message.channel.send(`<@${message.author.id}>, 🏓 **Pong!** \`${client.ws.ping}ms\`.`);
  },
};
