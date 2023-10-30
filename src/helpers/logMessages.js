function logMessages(interaction, command) {
  const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');
  logChannel.send(`**/${command}** usado pelo usuário <@${interaction.user.id}>`);
}

module.exports = {
  logMessages,
};
