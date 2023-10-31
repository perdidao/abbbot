const { SlashCommandBuilder } = require('discord.js');

const commandName = 'vincular';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Ensina o usuário a vincular a conta do discord na Gamers Club'),
  async execute(interaction) {
    const message = 'Para vincular sua conta com nosso Discord acessar <https://gamersclub.com.br/gerenciar#conexoes> e clique no botão "Autorizar Discord", é importante verificar se você esta logado no Discord Web com a conta correta antes de efetuar este procedimento.';

    interaction.reply(message);
  },
};
