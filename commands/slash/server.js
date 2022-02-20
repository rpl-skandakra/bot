const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const { invite, website } = require('../../data/bot.json');
const { ROLE_ADMIN_ID } = process.env;

module.exports = {
  name: 'server',
  data: new SlashCommandBuilder().setName('server').setDescription('Show information about server'),
  execute: (interaction) => {
    const adminRole = interaction.guild.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
    const admins = adminRole.members;
    const listAdmin = admins.map((admin) => `▸ ${admin}`);

    const serverInfo = new MessageEmbed()
      .setColor('#4484f1')
      .setTitle(`${interaction.guild.name} Discord Server 🛡`)
      .setThumbnail(interaction.guild.iconURL())
      .setDescription(interaction.guild.description || '-')
      .addFields([
        { name: 'Owner', value: `<@${interaction.guild.ownerId}>` },
        { name: `Daftar ${adminRole.name}`, value: listAdmin.join('\n') },
        { name: 'Website', value: website },
        { name: 'Invite Link', value: invite },
      ])
      .setFooter({
        text: `Server Ini Dibuat Pada : ${format(new Date(interaction.guild.createdAt), 'PPPP', {
          locale: id,
        })}`,
      });

    interaction.reply({ embeds: [serverInfo] });
  },
};
