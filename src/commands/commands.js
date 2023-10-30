const { SlashCommandBuilder } = require('discord.js');

// Helpers
const { logMessages } = require('../helpers/logMessages');

const commandName = 'commands';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Show all Abbbot`s commands'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      await interaction.reply({ content: 'This command is only available on the #comandos channel!', ephemeral: true });
    } else {
      logMessages(interaction, commandName);

      let result = '';
      result += '**Comandos** \n';
      result += '`/hello`: Responde com um hello! \n';
      result += '`/pick`: Seleciona uma entre as opções inseridas \n';
      result += '`/gc`: Atualiza o usuário com o Discord ID informado \n';
      result += '`/commands`: Mostra a lista de comandos atual \n';
      await interaction.reply(result);
    }
  },
};
