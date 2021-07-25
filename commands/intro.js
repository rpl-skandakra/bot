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
      const regexPattern = new RegExp(
        /(Nama|Kelas|Hobi|Asal Sekolah)[\s][:][\s\w]?\w{3,}/
      );
      if (regexPattern.test(message.content)) {
        user.roles.add(roleMember);
        message.react('☑');
        message.reply(
          `Selamat kamu sudah resmi menjadi **${roleMember.name}** dari **${message.guild.name}**.\nSelamat bergabung dan jangan lupa pilih role terlebih dahulu di ${chRole}!`
        );
      } else {
        message.react('❌');
        message.reply(
          'Silahkan masukkan format perkenalan dengan benar!\n**Contoh :**\n> Nama : Budi\n> Kelas : 11\n> Hobi : Memancing\n> Asal Sekolah : SMKN 2 Karanganyar'
        );
      }
    } else {
      message.react('⚠');
      message.reply(
        `Kamu sudah menjadi ${roleMember.name}, tidak perlu mengirim pesan lagi di channel ini.`
      );
    }
  },
};
