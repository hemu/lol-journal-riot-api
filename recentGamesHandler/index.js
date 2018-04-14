'use strict';

import auth from '../helpers/auth';
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
  // const authUser = auth(event);
  // if (!authUser) {
  //   callback(
  //     null,
  //     createResp(400, {
  //       error: 'No valid authenticated user found',
  //     }),
  //   );
  //   return;
  // }

  const body = JSON.parse(event.body);
  const summonerId = body.summonerId;

  if (summonerId != null) {
    return riotAxios
      .get(`matchlists/by-account/${summonerId}/recent`)
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
      })
      .catch((error) => {
        callback(
          null,
          createResp(502, {
            error: 'Could not retrieve data from riot servers',
          }),
        );
      })
  }
  callback(
    null,
    createResp(400, {
      error: 'No valid summonerId included in request.',
    }),
  );
};
