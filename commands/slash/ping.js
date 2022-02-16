const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction, client) {
    interaction.reply(`🏓 **Pong!** \`${client.ws.ping}ms\`.`);
  },
};
