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
          name: 'clear',
          value: `Clear messages (admin only)!\n__Usage__ : \`${prefix}clear 20\` (will clear 20 messages)`,
        },
        { name: 'server', value: 'Show server information' },
        { name: 'info', value: 'Show bot information' },
      ])
      .setColor('#5f74ec');
    message.channel.send(commandLists);
  },
};
