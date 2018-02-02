'use strict';
const axios = require('axios');
const helpers = require('./helpers/general');
const champion = require('./helpers/champion');

const API_KEY = require('./helpers/const').API_KEY;
const recentGamesUrl = (accountId) =>
  `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${API_KEY}`;

function parseRecentGamesResponse(resp) {
  const { matches } = resp;
  return matches.map((match) => ({
    lane: helpers.roleToLane(match.role, match.lane),
    champion: champion.getChampByKey(match.champion),
    queue: helpers.getQueue(match.queue),
    timestamp: match.timestamp,
    gameId: match.gameId
  }));
}

module.exports = (event, context, callback) => {
  if (event.body != null) {
    const body = JSON.parse(event.body);
    const accountId = body.accountId;
    if (accountId != null) {
      return axios.get(recentGamesUrl(accountId)).then((result) => {
        if (result.status === 200 && result.data && result.data.matches) {
          const response = helpers.createResp(200, {
            body: JSON.stringify(parseRecentGamesResponse(result.data))
          });
          callback(null, response);
        } else {
          callback(
            null,
            helpers.createResp(502, {
              error: 'Could not retrieve data from riot servers'
            })
          );
        }
      });
    }
  }
  callback(
    null,
    helpers.createResp(400, {
      error: 'No account id specified'
    })
  );
};
