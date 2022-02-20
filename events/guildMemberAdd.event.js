const { CH_INTRO_ID, CH_LOBBY_ID, CH_RULES_ID, SERVER_ID } = process.env;

module.exports = {
  name: 'guildMemberAdd',
  execute: (member) => {
    const chLobby = member.guild.channels.cache.find((ch) => ch.id === CH_LOBBY_ID);
    const chRule = member.guild.channels.cache.find((ch) => ch.id === CH_RULES_ID);
    const chIntro = member.guild.channels.cache.find((ch) => ch.id === CH_INTRO_ID);

    if (!chLobby) return;

    if (member.guild.id === SERVER_ID) {
      chLobby.send(
        `Halo ${member}, selamat datang di server **${member.guild.name}**.\nSilahkan baca peraturan di ${chRule} dan jangan lupa memperkenalkan diri di ${chIntro} agar bisa mengakses semua channel di server ini.`
      );
    }
  },
};
