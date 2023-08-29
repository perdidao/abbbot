const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getRandomInt } = require('../helpers/getRandomNumber');
const { primaryColor } = require('../helpers/settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pick')
    .addStringOption((option) => option
      .setName('options')
      .setDescription('As opções para sortear'))
    .setDescription('Replies with one random option'),
  async execute(interaction) {
    const options = interaction.options.getString('options');
    const parsedOptions = options.split(' ');
    const randomIndex = getRandomInt(0, parsedOptions.length - 1);

    // Log message
    const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');
    logChannel.send(`**/pick** usado pelo usuário <@${interaction.user.id}>`);

    // Assign active user role
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const newRole = interaction.guild.roles.cache.find((role) => role.name === 'Active user');
    await member.roles.add(newRole);

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
  },
};
