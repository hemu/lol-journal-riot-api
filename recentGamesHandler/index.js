'use strict';

import riotAxios from '../helpers/api';
import {
  createResp,
  roleToLane,
  isPartnerRole,
  getQueue,
} from '../helpers/general';
import { getChampByKey } from '../helpers/champion';

function parseRecentGamesResponse(resp) {
  const { matches } = resp;
  return matches.map((match) => ({
    lane: roleToLane(match.role, match.lane),
    champion: getChampByKey(match.champion),
    queue: getQueue(match.queue),
    timestamp: match.timestamp,
    gameId: match.gameId,
  }));
}

export default (event, context, callback) => {
  if (event.body != null) {
    const body = JSON.parse(event.body);
    const accountId = body.accountId;
    if (accountId != null) {
      return riotAxios
        .get(`matchlists/by-account/${accountId}/recent`)
        .then((result) => {
          if (result.status === 200 && result.data && result.data.matches) {
            const response = createResp(200, {
              body: JSON.stringify(parseRecentGamesResponse(result.data)),
            });
            callback(null, response);
          } else {
            callback(
              null,
              createResp(502, {
                error: 'Could not retrieve data from riot servers',
              }),
            );
          }
        });
    }
  }
  callback(
    null,
    createResp(400, {
      error: 'No account id specified',
    }),
  );
};
