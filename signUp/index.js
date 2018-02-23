import { createResp } from '../helpers/general';
import { USER_POOL_ID, APP_CLIENT_ID } from '../helpers/const';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  // AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

function signUp(email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID,
  });

  const dataEmail = {
    Name: 'email',
    Value: email,
  };
  const attributeEmail = new CognitoUserAttribute(dataEmail);

  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, [attributeEmail], null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.user);
    }),
  );
}

export default (event, context, callback) => {
  // this is a dev environment, load environment variables manually
  // from .env file (which is not managed by git)

  if (event.body != null) {
    const body = JSON.parse(event.body);
    const email = body.email;
    const password = body.password;
    if (email != null && password != null) {
      return signUp(email, password)
        .then((user) => {
          callback(
            null,
            createResp(200, {
              body: JSON.stringify({
                user: user,
              }),
            }),
          );
        })
        .catch((e) => {
          return callback(
            null,
            createResp(500, {
              body: JSON.stringify({
                error: e.code,
              }),
            }),
          );
        });
    } else {
      callback(
        null,
        createResp(400, {
          error: 'No email or password specified',
        }),
      );
    }
  } else {
    callback(
      null,
      createResp(400, {
        error: 'No email or password specified',
      }),
    );
  }
};
