const { SlashCommandBuilder } = require('discord.js');

// Helpers
const { logMessages } = require('../helpers/logMessages');
const { errorReply } = require('../helpers/errorReply');

const commandName = 'commands';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Show all Abbbot`s commands'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      errorReply(interaction, 'This command is only available on the #comandos channel!');
      return;
    }

    let result = '';
    result += '**Comandos** \n';
    result += '`/commands`: Mostra a lista de comandos atual \n';
    result += '`/pick`: Seleciona uma entre as opções inseridas \n';
    result += '`/gc`: Atualiza o usuário com o Discord ID informado \n';
    await interaction.reply(result);

    logMessages(interaction, commandName);
  },
};
