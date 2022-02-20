const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { name, prefix } = require('../../data/bot.json');

module.exports = {
  name: 'commands',
  data: new SlashCommandBuilder().setName('commands').setDescription('Show bot command lists'),
  execute: (interaction) => {
    const commandLists = new MessageEmbed()
      .setColor('#34bc6c')
      .setTitle(`${name}'s Command Lists`)
      .setDescription(`🤖 Daftar commands yang tersedia untuk ${name}`)
      .addFields([
        { name: 'ping', value: 'Ping bot!', inline: true },
        { name: 'pong', value: 'Pong bot!', inline: true },
        {
          name: 'sholat',
          value: 'Menampilkan jadwal sholat berdasarkan daerah',
        },
        { name: 'server', value: 'Menampilkan informasi server' },
        { name: 'info', value: 'Menampilkan informasi bot' },
        {
          name: 'clear',
          value: `Menghapus pesan (admin only)!\n__Usage__ : \`${prefix}clear 20\` (akan menghapus 20 pesan)`,
        },
      ])
      .setFooter({
        text: `Command used by: ${interaction.user.tag}`,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.reply({ embeds: [commandLists] });
  },
};
