const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Settings
const { primaryColor } = require('../helpers/settings');

// Helpers
const { errorFeedback, commandLog } = require('../helpers/feedbacks');
const { getGamersClubUserInfo } = require('../helpers/getGamersClubUserInfo');
const { restrictCommandByUserRole, restrictCommandByChannels } = require('../helpers/restrictions');

const commandName = 'info';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .addStringOption((option) => option
      .setName('discordid')
      .setDescription('O discord id da conta à ser atualizada'))
    .setDescription('Atualiza os cargos do usuário citado'),
  async execute(interaction) {
    const canGetUserInfo = restrictCommandByUserRole(interaction, 'Moderadores');
    const canUseCurrentChannel = restrictCommandByChannels(interaction, 'comandos');

    if (!canGetUserInfo) {
      errorFeedback(interaction, 'Apenas moderadores podem buscar informações de usuários');
      return;
    }

    if (!canUseCurrentChannel) {
      errorFeedback(interaction, 'Este comando só pode ser usado no canal #comandos');
      return;
    }
    const discordId = interaction.options.getString('discordid');

    const userData = await getGamersClubUserInfo(interaction, discordId);

    if (!userData) {
      errorFeedback(interaction, 'Usuário não encontrado :(');
      return;
    }

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

    commandLog(interaction, `Moderador solicitou informações do usuário ${discordId}.`);
  },
};
