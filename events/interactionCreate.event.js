module.exports = {
  name: 'interactionCreate',
  execute: (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, client } = interaction;
    const command = client.commands.get(commandName);
    console.log(command);
    if (command) {
      command.execute(interaction);
    }
  },
};
