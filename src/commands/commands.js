const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('Show all Abbbot`s commands'),
  async execute(interaction) {
    const currentChannel = interaction.channel.name;

    if (currentChannel !== 'comandos') {
      await interaction.reply({ content: 'This command is only available on the #comandos channel!', ephemeral: true });
    } else {
      const logChannel = interaction.guild.channels.cache.find((channel) => channel.name === 'logs');
      logChannel.send(`**/commands** usado pelo usuário <@${interaction.user.id}>`);

      let result = '';
      result += '**Comandos** \n';
      result += '`/pick`: seleciona uma entre as opções inseridas \n';
      await interaction.reply(result);
    }
  },
};
