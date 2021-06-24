const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server',
  description: 'Show information about server',
  execute: (message) => {
    const adminRole = message.guild.roles.cache.find(
      (role) => role.id === process.env.ROLE_ADMIN_ID
    );
    const admins = adminRole.members;
    const listAdmin = admins.map((admin) => `▸ ${admin}`);

    const serverInfo = new MessageEmbed()
      .setTitle(`${message.guild.name} Discord Server 🛡`)
      .setDescription(message.guild.description)
      .addFields([
        { name: 'Owner', value: message.guild.owner },
        {
          name: `Daftar ${adminRole.name}`,
          value: listAdmin,
        },
        { name: 'Dibuat Pada', value: message.guild.createdAt },
      ])
      .setImage(message.guild.iconURL())
      .setColor('#43823a');
    message.channel.send(serverInfo);
  },
};
