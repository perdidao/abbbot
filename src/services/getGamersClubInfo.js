const Axios = require('axios');

const gcApi = Axios.create({
  baseURL: process.env.GAMERSCLUB_API_URL,
  timeout: 4000,
});

async function getGamersClubInfo(discordId) {
  try {
    const data = await gcApi.get(discordId);

    if (!data) {
      return null;
    }

    return data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getGamersClubInfo,
};
