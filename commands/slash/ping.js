const { MessageFlags } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'ping',
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: (interaction) => {
    interaction.reply({ content: `🏓 **Pong!** \`${interaction.client.ws.ping}ms\`.`, flags: MessageFlags.Ephemeral });
  },
};
