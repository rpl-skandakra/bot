module.exports = {
  name: 'clear',
  description: 'To clear messages on a channel',
  execute: (message, text) => {
    const isAdmin = message.member.roles.cache.find(
      (role) => role.id === process.env.ROLE_ADMIN_ID
    );
    const adminName = message.guild.roles.cache.find(
      (role) => role.id === process.env.ROLE_ADMIN_ID
    );

    if (isAdmin) {
      if (text[1]) {
        message.channel.bulkDelete(text[1]);
      } else {
        message.reply('Masukkan jumlah pesan yang ingin dihapus!');
      }
    } else {
      message.reply(`Mohon maaf kamu bukan ${adminName} di server ini.`);
    }
  },
};
