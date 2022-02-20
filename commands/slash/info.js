const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { description, name, prefix, repo, version } = require('../../data/bot.json');
const { BOT_ID } = process.env;

module.exports = {
  name: 'info',
  data: new SlashCommandBuilder().setName('info').setDescription('Show bot information'),
  execute: (interaction) => {
    const bot = interaction.guild.members.cache.find((member) => member.id === BOT_ID);
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

    interaction.reply({ embeds: [infoBot] });
  },
};
