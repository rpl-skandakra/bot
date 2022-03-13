const fs = require('fs');
const QRCode = require('qrcode');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'qr',
  data: new SlashCommandBuilder()
    .setName('qr')
    .setDescription('For generate a qr code')
    .addStringOption((option) =>
      option.setName('text').setDescription('Text to be generated into qr').setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName('resolution').setDescription('Image resolution in px (default is using 1024)').setRequired(false)
    ),
  execute: (interaction) => {
    const text = interaction.options.getString('text');
    const resolution = interaction.options.getInteger('resolution') || 1024;

    const path = 'images';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const fileUrl = path + '/qrImage.png';
    QRCode.toFile(
      fileUrl,
      text,
      {
        color: {
          dark: '#000',
          light: '#FFF',
        },
        width: resolution,
      },
      function (err) {
        if (err) throw err;

        const attachment = new MessageAttachment(fileUrl);
        const qrImage = new MessageEmbed()
          .setColor('#4484f1')
          .setTitle(`QR Code Generated!`)
          .setImage('attachment://qrImage.png')
          .setFooter({
            text: `Command used by: ${interaction.user.tag}`,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({ embeds: [qrImage], files: [attachment] }).then(() => {
          console.log('Generated QR Code:', text);
          fs.unlinkSync(fileUrl);
        });
      }
    );
  },
};
