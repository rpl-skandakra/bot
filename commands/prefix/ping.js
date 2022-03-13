const pingBot = (message, client) => {
  message.reply(`🏓 **Pong!** \`${client.ws.ping}ms\`.`);
};

module.exports = { pingBot };
