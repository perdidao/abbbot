const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { primaryColor } = require('../helpers/settings');
const { getGamersClubInfo } = require('../services/getGamersClubInfo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gc')
    .addStringOption((option) => option
      .setName('discordid')
      .setDescription('O discord id da conta à ser atualizada'))
    .setDescription('Atualiza os cargos do usuário citado'),
  async execute(interaction) {
    // Log message
    const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');

    const discordId = interaction.options.getString('discordid');
    const gamersClubInfo = await getGamersClubInfo(discordId);

    if (!gamersClubInfo) {
      logChannel.send(`**/gc** usado por <@${interaction.user.id}> para atualizar <@${discordId}>`);
      interaction.reply({ content: 'Não encontramos esse usuário :(', ephemeral: true });
    }

    logChannel.send(`**/gc** usado por <@${interaction.user.id}> para atualizar <@${discordId}>`);

    // Assign active user role
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const newRole = interaction.guild.roles.cache.find((role) => role.name === 'Active user');
    await member.roles.add(newRole);

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
