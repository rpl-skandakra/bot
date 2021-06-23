const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./data/bot.json');

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bot sudah siap!');

  client.user
    .setActivity('RPL Skandakra Dev', {
      type: 'LISTENING',
    })
    .catch(console.error);
});

client.on('guildMemberAdd', (member) => {
  const chLobby = member.guild.channels.cache.find(
    (ch) => ch.id === process.env.CH_LOBBY_ID
  );
  const chRule = member.guild.channels.cache.find(
    (ch) => ch.id === process.env.CH_RULE_ID
  );
  const chIntro = member.guild.channels.cache.find(
    (ch) => ch.id === process.env.CH_INTRO_ID
  );

  if (!chLobby) return;

  if (member.guild.id === process.env.SERVER_ID) {
    chLobby.send(
      `Haii ${member}, selamat datang di server **${member.guild.name}**.\nSilahkan baca peraturan di ${chRule} dan jangan lupa memperkenalkan diri di ${chIntro} agar bisa mengakses semua channel di server ini.`
    );
  }
});

client.on('message', (message) => {
  const text = message.content.substring(prefix.length).split(' ');

  if (message.content.startsWith(prefix)) {
    switch (text[0]) {
      case 'ping':
        message.channel.send('🏓 **Pong!**');
        break;
      case 'pong':
        message.channel.send('🏓 **Ping!**');
        break;
    }
  }
});

client.login(process.env.BOT_TOKEN);
