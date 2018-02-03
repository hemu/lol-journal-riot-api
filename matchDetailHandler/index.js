import riotAxios from '../helpers/api';
import { createResp, roleToLane, isPartnerRole } from '../helpers/general';
import { getChampByKey } from '../helpers/champion';

function parseMatchDetailResponse(matchDetail, timeline, accountId) {
  const { participantIdentities, participants } = matchDetail;
  const identity = participantIdentities
    .filter((ident) => ident.player.accountId.toString() === accountId)
    .map((ident) => ident.participantId);

  if (identity.length < 1) {
    return null;
  }
  const targetParticipantId = identity[0];

  const playerDetails = participants
    .filter(({ participantId }) => participantId === targetParticipantId)
    .map(({ stats, timeline, teamId }) => ({
      kills: stats.kills,
      assists: stats.assists,
      deaths: stats.deaths,
      outcome: stats.win ? 'W' : 'L',
      role: roleToLane(timeline.role, timeline.lane),
      teamId,
    }))
    .shift();

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
  }

  // find opponent champion by finding opponent with same role
  const opponent = participants.find(
    ({ participantId, timeline: { role, lane } }) =>
      roleToLane(role, lane) === playerDetails.role &&
      participantId !== targetParticipantId,
  );
  playerDetails.opponentChampion = getChampByKey(opponent.championId);

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
    .forEach(
      ({ minionsKilled }, i) =>
        (playerDetails[`csAt${(i + 1) * 5}Min`] = minionsKilled),
    );

  return playerDetails;
}

const getMatchDetails = (matchId) => riotAxios.get(`matches/${matchId}`);
const getMatchTimeline = (matchId) =>
  riotAxios.get(`timelines/by-match/${matchId}`);

module.exports = (event, context, callback) => {
  if (event.body != null) {
    const body = JSON.parse(event.body);
    const matchId = body.matchId;
    const accountId = body.accountId;
    if (matchId != null && accountId != null) {
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
                  accountId,
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
          callback(
            null,
            createResp(502, {
              error: 'Error retrieving data from riot servers',
            }),
          );
        });
    }
  }
  callback(
    null,
    createResp(400, {
      error: 'No match id specified',
    }),
  );
};
