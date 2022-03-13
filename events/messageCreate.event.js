const { clearMessage } = require('../commands/prefix/clear');
const { showCommands } = require('../commands/prefix/commands');
const { showInfo } = require('../commands/prefix/info');
const { sendIntro } = require('../commands/prefix/intro');
const { pingBot } = require('../commands/prefix/ping');
const { showServerInfo } = require('../commands/prefix/server');
const { showPraySchedule } = require('../commands/prefix/sholat');

const { prefix } = require('../data/bot.json');
const { CH_INTRO_ID } = process.env;

module.exports = {
  name: 'messageCreate',
  execute: (message) => {
    if (message.author.bot) return;

    const client = message.client;
    if (message.channel.id === CH_INTRO_ID) {
      sendIntro(message, client);
    } else {
      const text = message.content.substring(prefix.length).split(' ');
      if (message.content.startsWith(prefix)) {
        switch (text[0]) {
          case 'clear':
            clearMessage(message, text);
            break;
          case 'commands':
            showCommands(message);
            break;
          case 'info':
            showInfo(message);
            break;
          case 'ping':
            pingBot(message, client);
            break;
          case 'server':
            showServerInfo(message);
            break;
          case 'sholat':
            showPraySchedule(message, text);
            break;
          default:
            message.channel.send(
              `Commands tidak ditemukan! Silahkan ketik \`${prefix}commands\` untuk menampilkan list commands.`
            );
            break;
        }
      }
    }
  },
};
