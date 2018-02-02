'use strict';

const helpers = require('./helpers/general');
const champion = require('./helpers/champion');

const riotAxios = helpers.riotAxios;

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
      return riotAxios
        .get(`matchlists/by-account/${accountId}/recent`)
        .then((result) => {
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
