const { SlashCommandBuilder } = require('discord.js');

// Helpers
const { errorFeedback, commandLog } = require('../helpers/feedbacks');

const commandName = 'commands';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Responde com todos os comandos disponíveis'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      errorFeedback(interaction, 'This command is only available on the #comandos channel!');
      return;
    }

    let result = '';
    result += '**Comandos** \n';
    result += '`/info`: Atualiza as informações do usuário com o Discord ID informado \n';
    result += '`/me`: Busca as informações do usuário que enviar o comando \n';
    result += '`/pick`: Seleciona uma entre as opções inseridas \n';
    await interaction.reply(result);

    commandLog(interaction, 'Usuário solicitou a lista de comandos.');
  },
};
