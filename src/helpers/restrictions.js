function restrictCommandByUserRole(interaction, roleName) {
  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = interaction.guild.roles.cache.find((r) => r.name === roleName);

  return member.roles.cache.has(role.id);
}

function restrictCommandByChannels(interaction, channels) {
  const currentChannel = interaction.channel.name;

  return channels.includes(currentChannel);
}

module.exports = {
  restrictCommandByUserRole,
  restrictCommandByChannels,
};
