const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Settings
const { primaryColor } = require('../helpers/settings');

// Helpers
const { getRandomInt } = require('../helpers/getRandomInt');
const { commandLog } = require('../helpers/feedbacks');

const commandName = 'pick';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .addStringOption((option) => option
      .setName('options')
      .setDescription('As opções para sortear'))
    .setDescription('Sorteia uma das opções informadas'),
  async execute(interaction) {
    const options = interaction.options.getString('options');
    const parsedOptions = options.split(' ');
    const randomIndex = getRandomInt(parsedOptions.length - 1);

    // Create embed message
    const embed = new EmbedBuilder();
    embed
      .setColor(primaryColor)
      .setTitle('Resultado da escolha')
      .addFields(
        { name: 'Escolhido', value: parsedOptions[randomIndex] },
        { name: 'Opções', value: options },
      );

    // Reply with the result
    await interaction.reply({ embeds: [embed] });

    commandLog(interaction, 'Usuário usou o comando de escolha.');
  },
};
