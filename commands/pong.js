const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'pong',
  description: 'Replies with Ping!',
  data: new SlashCommandBuilder().setName('pong').setDescription('Replies with Ping!'),
  execute: (message, client) => {
    message.channel.send(`<@${message.author.id}>, 🏓 **Ping!** \`${client.ws.ping}ms\`.`);
  },
};
