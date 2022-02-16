const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('pong').setDescription('Replies with Ping!'),
  async execute(interaction, client) {
    interaction.reply(`🏓 **Ping!** \`${client.ws.ping}ms\`.`);
  },
};
