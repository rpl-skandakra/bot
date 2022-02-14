const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { prefix } = require('./data/bot.json');
const {
  CH_INTRO_ID,
  CH_LEAVE_ID,
  CH_LOBBY_ID,
  CH_RULES_ID,
  SERVER_ID,
} = require('./data/listIdTest.json');

dotenv.config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
client.commands = new Collection();

const files = fs
  .readdirSync(path.resolve('./commands'))
  .filter((file) => file.endsWith('.js'));

files.map((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.on('ready', () => {
  console.log('Bot sudah siap!');

  const peoples = ['Masyarakat', 'RPL Skandakra Dev', 'Discord Server'];
  let i = 0;
  setInterval(() => {
    client.user.setActivity(peoples[i++ % peoples.length], {
      type: 'LISTENING',
    });
  }, 15000);
});

client.on('guildMemberAdd', (member) => {
  const chLobby = member.guild.channels.cache.find(
    (ch) => ch.id === CH_LOBBY_ID
  );
  const chRule = member.guild.channels.cache.find(
    (ch) => ch.id === CH_RULES_ID
  );
  const chIntro = member.guild.channels.cache.find(
    (ch) => ch.id === CH_INTRO_ID
  );

  if (!chLobby) return;

  if (member.guild.id === SERVER_ID) {
    chLobby.send(
      `Halo ${member}, selamat datang di server **${member.guild.name}**.\nSilahkan baca peraturan di ${chRule} dan jangan lupa memperkenalkan diri di ${chIntro} agar bisa mengakses semua channel di server ini.`
    );
  }
});

client.on('guildMemberRemove', (member) => {
  const chLeave = member.guild.channels.cache.find(
    (ch) => ch.id === CH_LEAVE_ID
  );

  if (!chLeave) return;

  if (member.guild.id === SERVER_ID) {
    chLeave.send(
      `Terima kasih telah menjadi bagian dari kami.\nSee you **${member.displayName}** 🍃`
    );
  }
});

client.on('messageCreate', (message) => {
  if (message.channel.id === CH_INTRO_ID && !message.author.bot) {
    client.commands.get('intro').execute(client, message);
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
        // case 'clear':
        //   client.commands.get('clear').execute(message, text);
        //   break;
        // case 'sholat':
        //   client.commands.get('sholat').execute(message, text);
        //   break;
        // case 'server':
        //   client.commands.get('server').execute(message);
        //   break;
        // case 'info':
        //   client.commands.get('info').execute(message);
        //   break;
        // case 'commands':
        //   client.commands.get('commands').execute(message);
        //   break;
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
