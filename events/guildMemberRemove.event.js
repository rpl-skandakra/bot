const { CH_LEAVE_ID, SERVER_ID } = process.env;

module.exports = {
  name: 'guildMemberRemove',
  execute: (member) => {
    const chLeave = member.guild.channels.cache.find((ch) => ch.id === CH_LEAVE_ID);

    if (!chLeave) return;

    if (member.guild.id === SERVER_ID) {
      chLeave.send(`Terima kasih telah menjadi bagian dari kami.\nSee you **${member.displayName}** 🍃`);
    }
  },
};
