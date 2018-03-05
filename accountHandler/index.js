'use strict';

import { accountEndpoint } from '../helpers/api';
import { createResp } from '../helpers/general';

export default (event, context, callback) => {
  const body = JSON.parse(event.body);
  const summonerName = body.summonerName;
  if (summonerName != null) {
    return accountEndpoint(summonerName)
      .get()
      .then((result) => {
        if (result.status === 200 && result.data && result.data.accountId) {
          const response = createResp(200, {
            body: JSON.stringify({
              summonerId: result.data.accountId,
            }),
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
        console.log(error.response.status);
        console.log(error.response.status === 404);
        if (error.response.status === 404) {
          callback(null, createResp(200, null));
        } else {
          callback(
            null,
            createResp(502, {
              error: 'Error retrieving summoner name from riot servers',
            }),
          );
        }
      });
  } else {
    callback(
      null,
      createResp(400, {
        error: 'No summoner name specified.',
      }),
    );
  }
};
