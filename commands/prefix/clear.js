const { ROLE_ADMIN_ID } = process.env;

const clearMessage = (message, text) => {
  const isAdmin = message.member.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
  const adminName = message.guild.roles.cache.find((role) => role.id === ROLE_ADMIN_ID);
  if (!isAdmin) {
    return message.reply(`Mohon maaf kamu bukan ${adminName} di server ini.`);
  }
  if (!text[1]) {
    return message.reply('Masukkan jumlah pesan yang ingin dihapus!');
  }

  message.channel.bulkDelete(text[1]);
  message.channel.send(`Berhasil menghapus ${text[1]} pesan 🔥`);
  setTimeout(() => {
    message.channel.bulkDelete(1);
  }, 3000);
};

module.exports = { clearMessage };
