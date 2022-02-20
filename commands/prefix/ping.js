const pingBot = (message, client) => {
  message.reply(`🏓 **Pong!** \`${client.ws.ping}ms\`.`);
};

const pongBot = (message, client) => {
  message.reply(`🏓 **Ping!** \`${client.ws.ping}ms\`.`);
};

module.exports = { pingBot, pongBot };
