const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { format, formatISO } = require('date-fns');
const { id } = require('date-fns/locale');
const { prefix } = require('../../data/bot.json');

const showPraySchedule = (message, text) => {
  if (!text[1] || (text[1] && !text[1].length)) {
    return message.reply(`Silahkan masukkan daerah yang ingin dicari. Contoh: \`${prefix}sholat karanganyar\``);
  }

  const year = new Date().getFullYear();
  const month = format(new Date(), 'MM');
  const currentDate = formatISO(new Date(), { representation: 'date' });
  const location = text[1].toLowerCase();

  axios
    .get(`https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${location}/${year}/${month}.json`)
    .then((response) => {
      console.log('Location:', location);
      console.log(response.statusText, response.status);
      const schedule = response.data.find((data) => data.tanggal === currentDate);
      const { shubuh, terbit, dzuhur, ashr, magrib, isya } = schedule;

      const lokasi = `${location.charAt(0).toUpperCase()}${location.slice(1)}`;
      const praySchedule = new MessageEmbed()
        .setTitle(`Jadwal Sholat Daerah ${lokasi} ⏲`)
        .addFields([
          {
            name: 'Hari, Tanggal',
            value: format(new Date(currentDate), 'PPPP', {
              locale: id,
            }),
          },
          { name: 'Subuh', value: shubuh, inline: true },
          { name: 'Terbit', value: terbit, inline: true },
          { name: 'Dzuhur', value: dzuhur, inline: true },
          { name: 'Ashar', value: ashr, inline: true },
          { name: 'Maghrib', value: magrib, inline: true },
          { name: 'Isya', value: isya, inline: true },
          {
            name: 'Sumber Data',
            value: 'https://github.com/lakuapik/jadwalsholatorg',
          },
        ])
        .setColor('#4484f1')
        .setFooter({
          text: `Command used by: ${message.author.tag}`,
          iconURL: message.author.avatarURL(),
        });

      message.channel.send({ embeds: [praySchedule] });
    })
    .catch((error) => {
      console.log('Location:', location);
      console.error(error.response.data);
      if (error.response.status === 404) {
        message.channel.send(`⚠ Jadwal lokasi **${location}** tidak ditemukan!`);
      } else {
        message.channel.send(
          `⚠ Mohon maaf, terdapat kesalahan pengambilan data\n\`\`\`bash\n${error.response.data}\`\`\``
        );
      }
    });
};

module.exports = { showPraySchedule };
