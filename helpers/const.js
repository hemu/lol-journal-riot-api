if (!process.env.NODE_ENV || process.env.NODE_ENV == 'dev') {
  require('dotenv').config();
}

export const API_KEY = process.env.RIOT_API_KEY;
// export const USER_POOL_ID = process.env.USER_POOL_ID;
// export const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
