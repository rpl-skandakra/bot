const { MessageEmbed } = require('discord.js');
const { name, prefix } = require('../data/bot.json');

module.exports = {
  name: 'commands',
  description: 'Show bot command lists',
  execute: (message) => {
    const commandLists = new MessageEmbed()
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
      .setColor('#5f74ec');
    message.channel.send(commandLists);
  },
};
