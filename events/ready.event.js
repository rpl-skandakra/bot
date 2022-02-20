module.exports = {
  name: 'ready',
  execute: (client) => {
    console.log(`Logged in as: ${client.user.tag}`);
    console.log('Bot is ready!');

    const peoples = ['Masyarakat', 'RPL Skandakra Dev', 'Discord Server'];
    let i = 0;
    setInterval(() => {
      client.user.setActivity(peoples[i++ % peoples.length], {
        type: 'LISTENING',
      });
    }, 15000);
  },
};
