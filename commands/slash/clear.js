const { SlashCommandBuilder } = require('@discordjs/builders');
const { ROLE_ADMIN_ID } = process.env;

module.exports = {
  name: 'clear',
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('For clear messages on a channel')
    .addIntegerOption((option) =>
      option.setName('number').setDescription('Number of messages to be deleted').setRequired(true)
    ),
  execute: (interaction) => {
    const isAdmin = interaction.member.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
    const adminName = interaction.guild.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
    const numberOfMessage = interaction.options.getInteger('number');

    if (isAdmin) {
      interaction.channel.bulkDelete(numberOfMessage);
      interaction.reply(`Berhasil menghapus ${numberOfMessage} pesan 🔥`);
      setTimeout(() => {
        interaction.channel.bulkDelete(1);
      }, 3000);
    } else {
      interaction.reply(`Mohon maaf kamu bukan ${adminName} di server ini.`);
    }
  },
};
