const Axios = require('axios');

const gcApi = Axios.create({
  baseURL: 'https://api.gamersclub.com.br/v1/user/discord/',
  timeout: 4000,
});

async function getGamersClubInfo(discordId) {
  const data = await gcApi.get(discordId);

  if (!data) {
    return null;
  }

  return data.data;
}

module.exports = {
  getGamersClubInfo,
};
