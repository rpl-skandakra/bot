const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const { prefix } = require('./data/bot.json');

dotenv.config();
const client = new Discord.Client();
const commands = new Discord.Collection();

const files = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

files.map((file) => {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
});

// createServer
http
  .createServer(function (req, res) {
    res.write(`I'm alive!`);
    res.end();
  })
  .listen(8080);

client.on('ready', () => {
  console.log('Bot sudah siap!');

  const peoples = ['Masyarakat', 'RPL Skandakra Dev', 'Discord Server'];
  const activities = ['LISTENING', 'WATCHING'];
  let i = 0;
  setInterval(() => {
    client.user
      .setActivity(peoples[i++ % peoples.length], {
        type: activities[i++ % activities.length],
      })
      .catch(console.error);
  }, 10000);
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

client.on('guildMemberRemove', (member) => {
  const chLeave = member.guild.channels.cache.find(
    (ch) => ch.id === process.env.CH_LEAVE_ID
  );

  if (!chLeave) return;

  if (member.guild.id === process.env.SERVER_ID) {
    chLeave.send(
      `Terima kasih telah menjadi bagian dari kami.\nSee you **${member.displayName}** 🍃`
    );
  }
});

client.on('message', (message) => {
  if (message.channel.id === process.env.CH_INTRO_ID && !message.author.bot) {
    commands.get('intro').execute(message);
  } else {
    const text = message.content.substring(prefix.length).split(' ');
    if (message.content.startsWith(prefix)) {
      switch (text[0]) {
        case 'ping':
          message.reply(`🏓 **Pong!**, \`${client.ws.ping}ms\`.`);
          break;
        case 'pong':
          message.reply(`🏓 **Ping!**, \`${client.ws.ping}ms\`.`);
          break;
        case 'clear':
          commands.get('clear').execute(message, text);
          break;
        case 'sholat':
          commands.get('sholat').execute(message, text);
          break;
        case 'server':
          commands.get('server').execute(message);
          break;
        case 'info':
          commands.get('info').execute(message);
          break;
        case 'commands':
          commands.get('commands').execute(message);
          break;
        default:
          message.channel.send(
            `Commands tidak ditemukan! Silahkan ketik \`${prefix}commands\` untuk menampilkan list commands.`
          );
          break;
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
