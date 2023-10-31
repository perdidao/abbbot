const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Settings
const { primaryColor } = require('../helpers/settings');

// Helpers
const { logMessages } = require('../helpers/logMessages');
const { getGamersClubUserInfo } = require('../helpers/getGamersClubUserInfo');

const commandName = 'me';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Atualiza os cargos do usuário citado'),
  async execute(interaction) {
    const discordId = interaction.user.id;

    const userData = await getGamersClubUserInfo(interaction, discordId);

    // Create embed message
    const embed = new EmbedBuilder();
    embed
      .setColor(primaryColor)
      .setTitle(userData.nick)
      .setURL(`https://gamersclub.com.br/jogador/${userData.id}`)
      .setThumbnail(userData.avatar)
      .addFields(
        { name: 'ID', value: userData.id.toString(), inline: true },
        { name: 'Nome', value: userData.name, inline: true },
        { name: 'Assinatura', value: userData.subscription, inline: true },
        { name: 'Level', value: `${userData.level}`, inline: true },
        { name: 'País', value: userData.country, inline: true },
      );

    // Reply with the result
    await interaction.reply({ embeds: [embed] });

    logMessages(interaction, commandName);
  },
};
