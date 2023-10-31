require('dotenv').config();

const { Client, GatewayIntentBits, Events } = require('discord.js');
const { updateCommands } = require('./helpers/commandsUpdater');
const { getGamersClubUserInfo } = require('./helpers/getGamersClubUserInfo');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Ready
client.on(Events.ClientReady, () => {
  client.guilds.cache.each((guild) => {
    const logChannel = guild.channels.cache.find((channel) => channel.name === 'logs');
    logChannel.send('Bot ativo!');
  });
});

client.on(Events.MessageCreate, (interaction) => {
  if (interaction.author.id !== client.user.id) {
    getGamersClubUserInfo(interaction, interaction.author.id);
  }
});

updateCommands(client);

client.login(process.env.BOT_TOKEN);
