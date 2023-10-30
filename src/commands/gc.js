const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Helpers
const { primaryColor } = require('../helpers/settings');
const { logMessages } = require('../helpers/logMessages');

// Services
const { getGamersClubInfo } = require('../services/getGamersClubInfo');

const commandName = 'gc';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .addStringOption((option) => option
      .setName('discordid')
      .setDescription('O discord id da conta à ser atualizada'))
    .setDescription('Atualiza os cargos do usuário citado'),
  async execute(interaction) {
    // Log message
    const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');
    logMessages(interaction, commandName);

    const discordId = interaction.options.getString('discordid');
    const gamersClubInfo = await getGamersClubInfo(discordId);

    if (!gamersClubInfo) {
      logChannel.send(`**/gc** usado por <@${interaction.user.id}> para atualizar <@${discordId}>`);
      interaction.reply({ content: 'Não encontramos esse usuário :(', ephemeral: true });
    }

    // Assign user roles
    const member = interaction.guild.members.cache.get(interaction.user.id);

    // Level role
    const levelRole = interaction.guild.roles.cache.find((role) => role.name === `Level ${gamersClubInfo.level}`);
    await member.roles.add(levelRole);

    // Subscriber role
    if (gamersClubInfo.subscription.toLowerCase() === 'premium' || gamersClubInfo.subscription.toLowerCase() === 'plus') {
      const subsRole = interaction.guild.roles.cache.find((role) => role.name === `Assinante ${gamersClubInfo.subscription.charAt(0).toUpperCase()}${gamersClubInfo.subscription.slice(1).toLowerCase()}`);
      await member.roles.add(subsRole);
    }

    // Staff role
    if (gamersClubInfo.staff) {
      const staffRole = interaction.guild.roles.cache.find((role) => role.name === 'Staff GC');
      await member.roles.add(staffRole);
    }

    // Create embed message
    const embed = new EmbedBuilder();
    embed
      .setColor(primaryColor)
      .setTitle('Usuário atualizado')
      .setThumbnail(gamersClubInfo.avatar)
      .addFields(
        { name: 'Nome', value: gamersClubInfo.name, inline: true },
        { name: 'Nick', value: gamersClubInfo.nick, inline: true },
        { name: 'Assinatura', value: gamersClubInfo.subscription, inline: true },
        { name: 'Level', value: `${gamersClubInfo.level}`, inline: true },
        { name: 'País', value: gamersClubInfo.country, inline: true },
      );

    // Reply with the result
    await interaction.reply({ embeds: [embed] });
  },
};
