import riotEndpoint from '../helpers/api';
import { createResp, roleToLane, isPartnerRole } from '../helpers/general';
import { getChampByKey, UNKNOWN_CHAMPION } from '../helpers/champion';


function epochTimeToDateString(epochInMiliseconds) {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCMilliseconds(epochInMiliseconds);
  return d.toISOString();
}

function parseMatchDetailResponse(matchDetail, timeline, summonerId) {
  const {
    participantIdentities,
    participants,
    gameId,
    platformId,
    gameCreation,
  } = matchDetail;

  const identity = participantIdentities
    .filter((ident) => ident.player.accountId.toString() === summonerId)
    .map((ident) => ident.participantId);

  if (identity.length < 1) {
    return null;
  }
  const targetParticipantId = identity[0];

  /*
  champion	""
  gameId	""
  rank	""
  video	""
  */

  const gameDetails = participants
    .filter(({ participantId }) => participantId === targetParticipantId)
    .map(({ stats, timeline, teamId, championId }) => ({
      kills: stats.kills,
      assists: stats.assists,
      deaths: stats.deaths,
      outcome: stats.win ? 'W' : 'L',
      champion: getChampByKey(championId),
      role: roleToLane(timeline.role, timeline.lane),
      // purposely set rank to a single space string
      teamId,
    }))
    .shift();

  gameDetails.gameId = gameId;
  gameDetails.regionId = platformId;
  gameDetails.gameDate = epochTimeToDateString(gameCreation);
  gameDetails.cs = [];

  const playerTeam = gameDetails.teamId;

  // ----------------------------------- All opponent champions -----
  const opponentChampions = participants
    .filter(({teamId}) => teamId !== gameDetails.teamId)
    .map(({championId}) => getChampByKey(championId))

  gameDetails.opponents = opponentChampions;

  // ----------------------------------------------- Partners -------

  const partners = participants
    .filter(({ timeline: { role, lane } }) =>
      isPartnerRole(gameDetails.role, role, lane),
    )
    .map(({ championId, teamId }) => ({
      champion: getChampByKey(championId),
      teamId,
    }));

  if (partners.length === 2) {
    const [partnerA, partnerB] = partners;
    gameDetails.partner =
      partnerA.teamId === gameDetails.teamId
        ? partnerA.champion
        : partnerB.champion;

    gameDetails.opponentPartner =
      partnerA.teamId !== gameDetails.teamId
        ? partnerA.champion
        : partnerB.champion;
  } else {
    gameDetails.partner = UNKNOWN_CHAMPION;
    gameDetails.opponentPartner = UNKNOWN_CHAMPION;
  }

  // ----------------------------------------------- Opponent -------

  // find opponent champion by finding opponent with same role
  const opponent = participants.find(
    ({ participantId, timeline: { role, lane } }) => {
      return (
        roleToLane(role, lane) === gameDetails.role &&
        participantId !== targetParticipantId
      );
    },
  );

  gameDetails.opponentChampion = opponent
    ? getChampByKey(opponent.championId)
    : UNKNOWN_CHAMPION;

  // get minion kills from detailed match history
  timeline.frames
    .map((frame) => ({
      timestamp: frame.timestamp,
      min: frame.timestamp / 60000,
      minionsKilled: frame.participantFrames[targetParticipantId].minionsKilled,
    }))
    .filter(
      (frame) =>
        (frame.min > 4.5 && frame.min < 5.5) ||
        (frame.min > 9.5 && frame.min < 10.5) ||
        (frame.min > 14.5 && frame.min < 15.5) ||
        (frame.min > 19.5 && frame.min < 20.5),
    )
    .forEach(({ minionsKilled }, i) =>
      gameDetails.cs.push([(i + 1) * 5, minionsKilled]),
    );

  // ----------------------------------------------- Deaths ---------
  function timeString(milliseconds) {
    const fullSeconds = milliseconds / 1000;
    const pad = function(num, size) { return ('000' + num).slice(size * -1); }
    const time = parseFloat(fullSeconds).toFixed(3);
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);
    if(hours > 0) {
      return pad(hours, 1) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
    }
    return pad(minutes, 2) + ':' + pad(seconds, 2);
  }

  const CHAMP_KILL_EVENT = 'CHAMPION_KILL'
  const deathTimes = timeline.frames
    .reduce((acc, frame) => acc.concat(frame.events), [])
    .filter((event) => event.type === CHAMP_KILL_EVENT && event.victimId !== undefined && event.victimId === targetParticipantId)
    .map((event) => timeString(event.timestamp))

  gameDetails.deathTimes = deathTimes;

  return gameDetails;
}

const getMatchDetails = (matchId, regionId) => riotEndpoint(regionId).get(`matches/${matchId}`);
const getMatchTimeline = (matchId, regionId) =>
  riotEndpoint(regionId).get(`timelines/by-match/${matchId}`);

module.exports = (event, context, callback) => {
  if (event.body != null) {
    const body = JSON.parse(event.body);
    const matchId = body.matchId;
    const summonerId = body.summonerId;
    const regionId = body.regionId;
    if (matchId != null && summonerId != null && regionId != null) {
      return Promise.all([getMatchDetails(matchId, regionId), getMatchTimeline(matchId, regionId)])
        .then((fetchResponses) => {
          const matchDetail = fetchResponses[0];
          const matchTimeline = fetchResponses[1];
          if (
            matchDetail.status === 200 &&
            matchDetail.data &&
            matchTimeline.status === 200 &&
            matchTimeline.data
          ) {
            const response = createResp(200, {
              body: JSON.stringify(
                parseMatchDetailResponse(
                  matchDetail.data,
                  matchTimeline.data,
                  summonerId,
                ),
              ),
            });
            callback(null, response);
          } else {
            callback(
              null,
              createResp(502, {
                error: 'Error retrieving data from riot servers',
              }),
            );
          }
        })
        .catch((error) => {
          console.log(error);
          callback(
            null,
            createResp(502, {
              error: 'Error retrieving data from riot servers',
            }),
          );
        });
    }
    callback(
      null,
      createResp(400, { error: 'No matchId or summonerId or regionId specified' }),
    );
  } else {
    callback(
      null,
      createResp(400, {
        error: 'No matchId specified',
      }),
    );
  }
};
