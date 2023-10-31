// Helpers
const { errorReply } = require('./errorReply');

// Services
const { getGamersClubInfo } = require('../services/getGamersClubInfo');

async function getGamersClubUserInfo(interaction, discordId) {
  const gamersClubInfo = await getGamersClubInfo(discordId);

  if (!gamersClubInfo) {
    errorReply(interaction, 'Usuário não encontrado :(');
    return null;
  }

  // Assign user roles ===================================================
  const member = interaction.guild.members.cache.get(discordId);

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

  return gamersClubInfo;
}

module.exports = {
  getGamersClubUserInfo,
};
