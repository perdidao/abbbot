const { SlashCommandBuilder } = require('discord.js');

const commandName = 'suporte';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Ensina o usuário a vincular a conta do discord na Gamers Club'),
  async execute(interaction) {
    const message = 'Para entrar em contato com o nosso time de Community Experience basta clicar o ícone <:suporte:664908553529720834> no canto inferior esquerdo do site, ou enviar um email para `contato@gamersclub.com.br`';

    interaction.reply(message);
  },
};
