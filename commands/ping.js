module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  execute: (message, client) => {
    message.channel.send(`<@${message.author.id}>, 🏓 **Pong!** \`${client.ws.ping}ms\`.`);
  },
};
