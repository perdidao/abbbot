const { SlashCommandBuilder } = require('discord.js');

// Helpers
const { logMessages } = require('../helpers/logMessages');

const commandName = 'hello';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Replies with hello!'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      await interaction.reply({ content: 'This command is only available on the #comandos channel!', ephemeral: true });
    } else {
      logMessages(interaction, commandName);
      await interaction.reply('Hello!');
    }
  },
};
