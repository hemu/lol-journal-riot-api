import riotAxios from '../helpers/api';
import { createResp, roleToLane, isPartnerRole } from '../helpers/general';
import { getChampByKey, UNKNOWN_CHAMPION } from '../helpers/champion';

function parseMatchDetailResponse(matchDetail, timeline, summonerId) {
  const { participantIdentities, participants, gameId } = matchDetail;
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

  const playerDetails = participants
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

  playerDetails.gameId = gameId;
  playerDetails.cs = [];

  const playerTeam = playerDetails.teamId;

  const partners = participants
    .filter(({ timeline: { role, lane } }) =>
      isPartnerRole(playerDetails.role, role, lane),
    )
    .map(({ championId, teamId }) => ({
      champion: getChampByKey(championId),
      teamId,
    }));

  if (partners.length === 2) {
    const [partnerA, partnerB] = partners;
    playerDetails.partner =
      partnerA.teamId === playerDetails.teamId
        ? partnerA.champion
        : partnerB.champion;

    playerDetails.opponentPartner =
      partnerA.teamId !== playerDetails.teamId
        ? partnerA.champion
        : partnerB.champion;
  } else {
    playerDetails.partner = UNKNOWN_CHAMPION;
    playerDetails.opponentPartner = UNKNOWN_CHAMPION;
  }

  // find opponent champion by finding opponent with same role
  const opponent = participants.find(
    ({ participantId, timeline: { role, lane } }) => {
      return (
        roleToLane(role, lane) === playerDetails.role &&
        participantId !== targetParticipantId
      );
    },
  );

  playerDetails.opponentChampion = opponent
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
      playerDetails.cs.push([(i + 1) * 5, minionsKilled]),
    );

  //   cs: [
  // [5, faker.random.number(20)],
  // [10, faker.random.number({ min: 20, max: 70 })],
  // [15, faker.random.number({ min: 70, max: 120 })],
  // [20, faker.random.number({ min: 120, max: 160 })],
  // ],

  return playerDetails;
}

const getMatchDetails = (matchId) => riotAxios.get(`matches/${matchId}`);
const getMatchTimeline = (matchId) =>
  riotAxios.get(`timelines/by-match/${matchId}`);

module.exports = (event, context, callback) => {
  if (event.body != null) {
    const body = JSON.parse(event.body);
    const matchId = body.matchId;
    const summonerId = body.summonerId;
    if (matchId != null && summonerId != null) {
      return Promise.all([getMatchDetails(matchId), getMatchTimeline(matchId)])
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
      createResp(400, { error: 'No match id or summonerId specified' }),
    );
  } else {
    callback(
      null,
      createResp(400, {
        error: 'No match id specified',
      }),
    );
  }
};
