const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Settings
const { primaryColor } = require('../helpers/settings');

// Helpers
const { logMessages } = require('../helpers/logMessages');
const { errorReply } = require('../helpers/errorReply');
const { getGamersClubUserInfo } = require('../helpers/getGamersClubUserInfo');

const commandName = 'gc';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .addStringOption((option) => option
      .setName('discordid')
      .setDescription('O discord id da conta à ser atualizada'))
    .setDescription('Atualiza os cargos do usuário citado'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;
    if (currentChannel !== 'comandos') {
      errorReply(interaction, 'This command is only available on the #comandos channel!');
      return;
    }
    const discordId = interaction.options.getString('discordid');

    const userData = await getGamersClubUserInfo(interaction, discordId);

    // Create embed message
    const embed = new EmbedBuilder();
    embed
      .setColor(primaryColor)
      .setTitle('Usuário atualizado')
      .setThumbnail(userData.avatar)
      .addFields(
        { name: 'Nome', value: userData.name, inline: true },
        { name: 'Nick', value: userData.nick, inline: true },
        { name: 'Assinatura', value: userData.subscription, inline: true },
        { name: 'Level', value: `${userData.level}`, inline: true },
        { name: 'País', value: userData.country, inline: true },
      );

    // Reply with the result
    await interaction.reply({ embeds: [embed] });

    logMessages(interaction, commandName);
  },
};
