const {
  CH_LOG_ID,
  CH_ROLE_ID,
  ROLE_MEMBER_ID,
} = require('../data/listId.json');

module.exports = {
  name: 'intro',
  description: 'To validate user introduction after joining server',
  execute: (client, message) => {
    const chRole = message.guild.channels.cache.find(
      (channel) => channel.id === CH_ROLE_ID
    );
    const roleMember = message.guild.roles.cache.find(
      (role) => role.id === ROLE_MEMBER_ID
    );
    const user = message.guild.members.cache.find(
      (member) => member.id === message.author.id
    );
    const chLog = client.channels.cache.get(CH_LOG_ID);

    let nama, kelas, hobi, asal;
    const arrMessages = message.content.split('\n');
    arrMessages.map((message) => {
      const data = message.split(' : ');
      switch (data[0].toLowerCase()) {
        case 'nama':
          nama = data[1];
          break;
        case 'kelas':
          kelas = data[1];
          break;
        case 'hobi':
          hobi = data[1];
          break;
        default:
          asal = data[1];
          break;
      }
    });

    if (!nama || !kelas || !hobi || !asal) {
      message.react('❌');
      message.reply(
        'Silahkan masukkan format perkenalan dengan benar!\n**Contoh :**\n> Nama : Budi\n> Kelas : 11\n> Hobi : Memancing\n> Asal Sekolah : SMKN 2 Karanganyar'
      );
    } else {
      user.roles.add(roleMember);
      chLog.send(`Pesan dari ${user}\n${message}`);
      message.react('☑');
      message.reply(
        `Selamat kamu sudah resmi menjadi **${roleMember.name}** dari **${message.guild.name}**.\nSelamat bergabung dan jangan lupa pilih role terlebih dahulu di ${chRole}!`
      );
    }
  },
};
