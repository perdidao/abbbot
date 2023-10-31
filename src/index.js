require('dotenv').config();

const { Client, GatewayIntentBits, Events } = require('discord.js');
const { updateCommands } = require('./helpers/commandsUpdater');
const { getGamersClubUserInfo } = require('./helpers/getGamersClubUserInfo');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const latestUsers = [];

// Ready
client.on(Events.ClientReady, () => {
  client.guilds.cache.each((guild) => {
    const logChannel = guild.channels.cache.find((channel) => channel.name === 'logs');
    logChannel.send('Bot ativo!');
  });
});

client.on(Events.MessageCreate, (interaction) => {
  const currentUser = interaction.author.id;
  const shouldUpdate = !latestUsers.includes(currentUser);
  if (currentUser !== client.user.id && shouldUpdate) {
    if (latestUsers.length > 100) {
      latestUsers.splice(0, 1);
    }
    latestUsers.push(currentUser);
    getGamersClubUserInfo(interaction, currentUser);
  }
});

updateCommands(client);

client.login(process.env.BOT_TOKEN);
