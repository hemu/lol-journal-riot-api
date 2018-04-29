var assert = require('assert');

import { roleToLane } from '../general';

// Possible Input Roles
// DUO, SOLO, DUO_CARRY, DUO_SUPPORT, NONE

// Possible Input Lanes
// MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM, NONE

// Possible Output Lanes
// Top, Jungle, Mid, Bottom, Support

// [role, lane]
const testValues = [
  // ["DUO", "MID", "Mid"],
  // ["DUO", "MIDDLE", "Mid"],
  // ["DUO", "TOP", "Top"],
  // ["DUO", "JUNGLE", "Jungle"],
  // ["DUO", "BOT", "Bottom"],
  // ["DUO", "BOTTOM", "Bottom"],
  // ["DUO", "NONE", "Bottom"],
  // ["SOLO", "MID", "Mid"],
  // ["SOLO", "MIDDLE", "Mid"],
  // ["SOLO", "TOP", "Top"],
  // ["SOLO", "JUNGLE", "Jungle"],
  // ["SOLO", "BOT", "Bottom"],
  // ["SOLO", "BOTTOM", "Bottom"],
  // ["SOLO", "NONE", "None"],
  // ["DUO_CARRY", "MID", "Mid"],
  // ["DUO_CARRY", "MIDDLE", "Mid"],
  // ["DUO_CARRY", "TOP", "Top"],
  // ["DUO_CARRY", "JUNGLE", "Jungle"],
  // ["DUO_CARRY", "BOT", "Bottom"],
  // ["DUO_CARRY", "BOTTOM", "Bottom"],
  // ["DUO_CARRY", "NONE", "Bottom"],
  // ["DUO_SUPPORT", "MID", "Support"],
  // ["DUO_SUPPORT", "MIDDLE", "Support"],
  // ["DUO_SUPPORT", "TOP", "Support"],
  // ["DUO_SUPPORT", "JUNGLE", "Support"],
  // ["DUO_SUPPORT", "BOT", "Support"],
  // ["DUO_SUPPORT", "BOTTOM", "Support"],
  // ["DUO_SUPPORT", "NONE", "Support"],
  // ["NONE", "MID", "Mid"]
  // ["NONE", "MIDDLE", "Mid"],
  // ["NONE", "TOP", "Top"]
  // ["NONE", "JUNGLE", "Jungle"],
  // ["NONE", "BOT", "Bottom"]
  // ["NONE", "BOTTOM", "Bottom"],
  // ["NONE", "NONE", "None"]
  // ['SOLO', 'MID', 'Mid'],
  ['DUO', 'NONE', 'Support', 'Zyra'],
  ['DUO', 'NONE', 'Support', 'Nami'],
  ['DUO', 'NONE', 'Bottom', 'Caitlyn'],
  ['DUO', 'NONE', 'Bottom', 'Twitch'],
];

// ["DUO", "SOLO", "DUO_CARRY", "DUO_SUPPORT", "NONE"].forEach(role => {
//   ["MID", "MIDDLE", "TOP", "JUNGLE", "BOT", "BOTTOM", "NONE"].forEach(lane => {
//     console.log(`["${role}", "${lane}", ""]`);
//   })
// })

describe('Role determination', function() {
  testValues.forEach(testVal => {
    it(`tests ${testVal}`, function() {
      let role, lane, expected, champ;
      [role, lane, expected, champ] = testVal;
      assert.equal(roleToLane(role, lane, champ), expected);
    });
  });
});
