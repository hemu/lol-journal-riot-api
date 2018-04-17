'use strict';

import { accountEndpoint } from '../helpers/api';
import { createResp } from '../helpers/general';

export default (event, context, callback) => {
  const body = JSON.parse(event.body);
  const summoner = body.summoner;
  const regionId = body.regionId;
  if (summoner !== null && summoner !== undefined && regionId !== null && regionId !== undefined) {
    return accountEndpoint(summoner, regionId)
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
          console.log(result);
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
        error: 'No summoner name or region specified.',
      }),
    );
  }
};
