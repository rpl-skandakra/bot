module.exports = {
  name: 'intro',
  description: 'To validate user introduction after joining server',
  execute: (message) => {
    if (
      /Nama :/.test(message.content) &&
      /Kelas :/.test(message.content) &&
      /Alamat :/.test(message.content) &&
      /Hobi :/.test(message.content)
    ) {
      const roleMember = message.guild.roles.cache.find(
        (role) => role.id === process.env.ROLE_MEMBER_ID
      );
      const user = message.guild.members.cache.find(
        (member) => member.id === message.author.id
      );

      user.roles.add(roleMember);
      message.reply(
        `Selamat kamu sudah resmi menjadi **${roleMember.name}** dari **${message.guild.name}**`
      );
    } else {
      message.reply(
        'Silahkan masukkan format perkenalan dengan benar!\n> Nama : \n> Kelas : \n> Alamat : \n> Hobi :'
      );
    }
  },
};
