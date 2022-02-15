const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const { MessageEmbed } = require('discord.js');
const { invite, website } = require('../data/bot.json');
const { ROLE_ADMIN_ID } = require('../data/listId.json');

module.exports = {
  name: 'server',
  description: 'Show information about server',
  execute: (message) => {
    const adminRole = message.guild.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
    const admins = adminRole.members;
    const listAdmin = admins.map((admin) => `▸ ${admin}`);

    const serverInfo = new MessageEmbed()
      .setColor('#4484f1')
      .setTitle(`${message.guild.name} Discord Server 🛡`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.guild.description || '-')
      .addFields([
        { name: 'Owner', value: `<@${message.guild.ownerId}>` },
        { name: `Daftar ${adminRole.name}`, value: listAdmin.join('\n') },
        { name: 'Website', value: website },
        { name: 'Invite Link', value: invite },
      ])
      .setFooter({
        text: `Server Ini Dibuat Pada : ${format(new Date(message.guild.createdAt), 'PPPP', {
          locale: id,
        })}`,
      });

    message.channel.send({ embeds: [serverInfo] });
  },
};
