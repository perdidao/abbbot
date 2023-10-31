function errorReply(interaction, errorMessage) {
  interaction.reply({ content: errorMessage, ephemeral: true });
}

module.exports = {
  errorReply,
};
