const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'pong',
  data: new SlashCommandBuilder().setName('pong').setDescription('Replies with Ping!'),
  execute: (interaction) => {
    interaction.reply(`🏓 **Ping!** \`${interaction.client.ws.ping}ms\`.`);
  },
};
