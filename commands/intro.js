module.exports = {
  name: 'intro',
  description: 'To validate user introduction after joining server',
  execute: (message) => {
    const chRole = message.guild.channels.cache.find(
      (channel) => channel.id === process.env.CH_ROLE_ID
    );
    const roleMember = message.guild.roles.cache.find(
      (role) => role.id === process.env.ROLE_MEMBER_ID
    );
    const user = message.guild.members.cache.find(
      (member) => member.id === message.author.id
    );
    const isMember = user.roles.cache.find(
      (role) => role.id === process.env.ROLE_MEMBER_ID
    );

    if (!isMember) {
      if (
        /Nama :/.test(message.content) &&
        /Kelas :/.test(message.content) &&
        /Alamat :/.test(message.content) &&
        /Hobi :/.test(message.content)
      ) {
        user.roles.add(roleMember);
        message.reply(
          `Selamat kamu sudah resmi menjadi **${roleMember.name}** dari **${message.guild.name}**.\nJangan lupa pilih role terlebih dahulu di ${chRole}!`
        );
      } else {
        message.reply(
          'Silahkan masukkan format perkenalan dengan benar!\n> Nama : \n> Kelas : \n> Alamat : \n> Hobi :'
        );
      }
    } else {
      message.reply(
        `Kamu sudah menjadi ${roleMember.name}, tidak perlu mengirim pesan lagi di channel ini.`
      );
    }
  },
};
