const { MessageEmbed } = require('discord.js');
const { name, prefix } = require('../../data/bot.json');

const showCommands = (message) => {
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
      text: `Command used by: ${message.author.tag}`,
      iconURL: message.author.avatarURL(),
    });

  message.channel.send({ embeds: [commandLists] });
};

module.exports = { showCommands };
