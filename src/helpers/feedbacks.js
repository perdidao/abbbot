function errorFeedback(interaction, errorMessage) {
  interaction.reply({ content: errorMessage, ephemeral: true });
}

function commandLog(interaction, logMessage) {
  const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');
  logChannel.send(`LOG: ${logMessage} \nAutor: ${interaction.user.id}`);
}

module.exports = {
  errorFeedback,
  commandLog,
};
