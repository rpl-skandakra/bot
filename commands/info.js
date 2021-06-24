const { MessageEmbed } = require('discord.js');
const {
  description,
  name,
  prefix,
  repo,
  version,
} = require('../data/bot.json');

module.exports = {
  name: 'info',
  description: 'Show bot information',
  execute: (message) => {
    const bot = message.guild.members.cache.find(
      (member) => member.id === process.env.BOT_ID
    );
    const infoBot = new MessageEmbed()
      .setTitle(`${name}'s Information`)
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
      .setColor('#5f74ec')
      .setImage(bot.user.avatarURL())
      .setTimestamp(new Date())
      .setFooter(`Versi ${version}`);
    message.channel.send(infoBot);
  },
};
