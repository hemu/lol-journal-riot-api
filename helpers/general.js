export const createResp = (statusCode, params) => {
  return Object.assign(
    {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      },
    },
    params,
  );
};

export const roleToLane = (role, lane) => {
  if (lane.indexOf('BOT') !== -1) {
    return role === 'DUO_SUPPORT' ? 'Support' : 'Bottom';
  }
  if (lane.indexOf('MID') !== -1) {
    return 'Mid';
  }
  const lowerCasedLane = lane.toLowerCase();
  return lowerCasedLane[0].toUpperCase() + lowerCasedLane.slice(1);
};

export const isPartnerRole = (targetRole, role, lane) => {
  switch (targetRole) {
    case 'Top':
      return lane === 'JUNGLE';
    case 'Jungle':
      return lane === 'TOP';
    case 'Mid':
      return lane === 'JUNGLE';
    case 'Bottom':
      return lane === 'BOTTOM' && role === 'DUO_SUPPORT';
    case 'Support':
      return lane === 'BOTTOM' && (role === 'DUO' || role === 'DUO_CARRY');
    default:
      return false;
  }
};

export const getQueue = (queueId) => {
  switch (queueId) {
    case 400:
      return 'Normal';
    case 420:
      return 'Ranked';
    default:
      return 'Other';
  }
};
