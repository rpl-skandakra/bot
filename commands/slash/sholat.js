const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { format, formatISO } = require('date-fns');
const { id } = require('date-fns/locale');

module.exports = {
  name: 'sholat',
  data: new SlashCommandBuilder()
    .setName('sholat')
    .setDescription('Show schedule of pray based on location')
    .addStringOption((option) => option.setName('lokasi').setDescription('Location').setRequired(true)),
  execute: (interaction) => {
    const year = new Date().getFullYear();
    const month = format(new Date(), 'MM');
    const currentDate = formatISO(new Date(), { representation: 'date' });
    const location = interaction.options.getString('lokasi').toLowerCase();

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
            text: `Command used by: ${interaction.user.tag}`,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({ embeds: [praySchedule] });
      })
      .catch((error) => {
        console.log('Location:', location);
        console.error(error.response.data);
        if (error.response.status === 404) {
          interaction.reply(`⚠ Jadwal lokasi **${location}** tidak ditemukan!`);
        } else {
          interaction.reply(
            `⚠ Mohon maaf, terdapat kesalahan pengambilan data\n\`\`\`bash\n${error.response.data}\`\`\``
          );
        }
      });
  },
};
