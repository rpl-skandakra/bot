const { ActivityType } = require('discord.js');

module.exports = {
  name: 'clientReady',
  execute: (client) => {
    console.log(`Logged in as: ${client.user.tag}`);
    console.log('Bot is ready!');

    const peoples = ['Warga Sipil', 'RPL Skandakra Dev', 'Discord Server'];
    let i = 0;
    setInterval(() => {
      client.user.setActivity(peoples[i++ % peoples.length], {
        type: ActivityType.Listening,
      });
    }, 15000);
  },
};
