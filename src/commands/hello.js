const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with hello!'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      await interaction.reply({ content: 'This command is only available on the #comandos channel!', ephemeral: true });
    } else {
      await interaction.reply('Hello!');
    }
  },
};
