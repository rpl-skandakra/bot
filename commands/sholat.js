const fetch = require('node-fetch');
const { format, formatISO } = require('date-fns');
const { id } = require('date-fns/locale');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sholat',
  description: 'Show schedule of pray based on location',
  execute: (message, text) => {
    const year = new Date().getFullYear();
    const month = format(new Date(), 'MM');
    const currentDate = formatISO(new Date(), { representation: 'date' });
    const location = text[1];

    if (text[1]) {
      fetch(
        `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${location}/${year}/${month}.json`
      )
        .then((res) => res.json())
        .then((res) => {
          const schedule = res.find((r) => r.tanggal === currentDate);
          const { shubuh, terbit, dzuhur, ashr, magrib, isya } = schedule;

          const praySchedule = new MessageEmbed()
            .setTitle(
              `Jadwal Sholat Daerah ${location
                .charAt(0)
                .toUpperCase()}${location.slice(1)} ⏲`
            )
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
            .setTimestamp(new Date())
            .setColor('#5f74ec');
          message.channel.send(praySchedule);
        })
        .catch((error) => {
          console.log(error);
          message.channel.send(
            `⚠ Mohon maaf, terdapat kesalahan pengambilan data\n\`\`\`bash\n${error}\`\`\``
          );
        });
    } else {
      message.reply('Silahkan masukkan daerah yang ingin dicari');
    }
  },
};
