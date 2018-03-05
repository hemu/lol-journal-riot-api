* make sure you use node v6.10
* use offline plugin

-- Commands --
nvm use 6.10
sls offline start


-- Manual Setup on Lambda --

set environment variables using their UI:
RIOT_API_KEY=...
NODE_ENV=prod
USER_POOL_ID=...
APP_CLIENT_ID=...
POOL_REGION=... (prob us-east-1)
