const { MessageEmbed } = require('discord.js');
const { description, name, prefix, repo, version } = require('../data/bot.json');
const { BOT_ID } = require('../data/listIdTest.json');

module.exports = {
  name: 'info',
  description: 'Show bot information',
  execute: (message) => {
    const bot = message.guild.members.cache.find((member) => member.id === BOT_ID);
    const infoBot = new MessageEmbed()
      .setColor('#34bc6c')
      .setTitle(`${name}'s Information`)
      .setThumbnail(bot.user.avatarURL())
      .setDescription(description)
      .addFields([
        { name: 'prefix', value: prefix, inline: true },
        {
          name: 'list commands',
          value: `\`${prefix}commands\``,
          inline: true,
        },
        { name: 'repository', value: repo },
      ])
      .setTimestamp()
      .setFooter({ text: `Versi ${version}` });

    message.channel.send({ embeds: [infoBot] });
  },
};
