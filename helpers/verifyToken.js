import jose from 'node-jose';

import { USER_POOL_ID, APP_CLIENT_ID, POOL_REGION } from './const';

const keys_url =
  'https://cognito-idp.' +
  POOL_REGION +
  '.amazonaws.com/' +
  USER_POOL_ID +
  '/.well-known/jwks.json';

function response(success, msg) {
  return {
    success,
    msg,
  };
}

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load page, status code: ' + response.statusCode),
        );
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err));
  });
};

export default (token) => {
  const sections = token.split('.');
  // get the kid from the headers prior to verification
  const header = jose.util.base64url.decode(sections[0]);
  header = JSON.parse(header);
  const kid = header.kid;
  // download the public keys
  return getContent(keys_url).then((response) => {
    if (!response.statusCode == 200) {
      return response(false, 'Could not access key servers.');
    }
    console.log(response);
    // response.on('data', function(body) {
    //   const keys = JSON.parse(body)['keys'];
    //   // search for the kid in the downloaded public keys
    //   let key_index = -1;
    //   for (let i = 0; i < keys.length; i++) {
    //     if (kid == keys[i].kid) {
    //       key_index = i;
    //       break;
    //     }
    //   }
    //   if (key_index == -1) {
    //     console.log('Public key not found in jwks.json');
    //     return 'Public key not found in jwks.json';
    //   }
    //   // construct the public key
    //   jose.JWK.asKey(keys[key_index]).then(function(result) {
    //     // verify the signature
    //     jose.JWS.createVerify(result)
    //       .verify(token)
    //       .then(function(result) {
    //         // now we can use the claims
    //         const claims = JSON.parse(result.payload);
    //         // additionally we can verify the token expiration
    //         current_ts = Math.floor(new Date() / 1000);
    //         if (current_ts > claims.exp) {
    //           callback('Token was not issued for this audience');
    //         }
    //         callback(null, claims);
    //       })
    //       .catch(function() {
    //         callback('Signature verification failed');
    //       });
    //   });
    // });
  });
};
