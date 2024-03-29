(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountEndpoint = undefined;

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _const = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountEndpoint = exports.accountEndpoint = function accountEndpoint(name) {
  return _axios2.default.create({
    baseURL: 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name,
    headers: {
      'X-Riot-Token': _const.API_KEY
    }
  });
};

exports.default = _axios2.default.create({
  baseURL: 'https://na1.api.riotgames.com/lol/match/v3/',
  headers: {
    'X-Riot-Token': _const.API_KEY
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueue = exports.isPartnerRole = exports.roleToLane = exports.createResp = undefined;

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResp = exports.createResp = function createResp(statusCode, params) {
  return (0, _assign2.default)({
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    }
  }, params);
};

var roleToLane = exports.roleToLane = function roleToLane(role, lane) {
  if (lane.indexOf('BOT') !== -1) {
    return role === 'DUO_SUPPORT' ? 'Support' : 'Bottom';
  }
  if (lane.indexOf('MID') !== -1) {
    return 'Mid';
  }
  var lowerCasedLane = lane.toLowerCase();
  return lowerCasedLane[0].toUpperCase() + lowerCasedLane.slice(1);
};

var isPartnerRole = exports.isPartnerRole = function isPartnerRole(targetRole, role, lane) {
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

var getQueue = exports.getQueue = function getQueue(queueId) {
  switch (queueId) {
    case 400:
      return 'Normal';
    case 420:
      return 'Ranked';
    default:
      return 'Other';
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNKNOWN_CHAMPION = exports.getChampByName = exports.getChampByKey = undefined;

var _champList = __webpack_require__(12);

var _champList2 = _interopRequireDefault(_champList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var champMapByKey = {};
var champMapByName = {};

_champList2.default.forEach(function (champ) {
  champMapByKey[champ.key] = champ.name;
  champMapByName[champ.name] = champ;
});

var getChampByKey = exports.getChampByKey = function getChampByKey(key) {
  return champMapByKey[key];
};

var getChampByName = exports.getChampByName = function getChampByName(champName) {
  if (!champName || !(champName in champMapByName)) {
    return champMapByName['Aatrox'];
  }
  return champMapByName[champName];
};

var UNKNOWN_CHAMPION = exports.UNKNOWN_CHAMPION = 'Unknown';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _recentGamesHandler = __webpack_require__(5);

var _recentGamesHandler2 = _interopRequireDefault(_recentGamesHandler);

var _matchDetailHandler = __webpack_require__(13);

var _matchDetailHandler2 = _interopRequireDefault(_matchDetailHandler);

var _accountHandler = __webpack_require__(16);

var _accountHandler2 = _interopRequireDefault(_accountHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import signUp from './signUp';

module.exports.recentGames = _recentGamesHandler2.default;
module.exports.matchDetail = _matchDetailHandler2.default;
module.exports.account = _accountHandler2.default;
// module.exports.signUp = signUp;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

var _auth = __webpack_require__(6);

var _auth2 = _interopRequireDefault(_auth);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _general = __webpack_require__(2);

var _champion = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseRecentGamesResponse(resp) {
  var matches = resp.matches;

  return matches.map(function (match) {
    return {
      lane: (0, _general.roleToLane)(match.role, match.lane),
      champion: (0, _champion.getChampByKey)(match.champion),
      queue: (0, _general.getQueue)(match.queue),
      timestamp: match.timestamp,
      gameId: match.gameId
    };
  });
}

exports.default = function (event, context, callback) {
  // const authUser = auth(event);
  // if (!authUser) {
  //   callback(
  //     null,
  //     createResp(400, {
  //       error: 'No valid authenticated user found',
  //     }),
  //   );
  //   return;
  // }

  var body = JSON.parse(event.body);
  var summonerId = body.summonerId;

  if (summonerId != null) {
    return _api2.default.get('matchlists/by-account/' + summonerId + '/recent').then(function (result) {
      if (result.status === 200 && result.data && result.data.matches) {
        var response = (0, _general.createResp)(200, {
          body: (0, _stringify2.default)(parseRecentGamesResponse(result.data))
        });
        callback(null, response);
      } else {
        callback(null, (0, _general.createResp)(502, {
          error: 'Could not retrieve data from riot servers'
        }));
      }
    }).catch(function (error) {
      callback(null, (0, _general.createResp)(502, {
        error: 'Could not retrieve data from riot servers'
      }));
    });
  }
  callback(null, (0, _general.createResp)(400, {
    error: 'No valid summonerId included in request.'
  }));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwtDecode = __webpack_require__(7);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (event) {
  if (!event.headers || !event.headers.Authorization) return null;
  var authToken = event.headers.Authorization;
  console.log(authToken);
  var userDetails = (0, _jwtDecode2.default)(authToken);
  console.log(userDetails);
  if (!userDetails) return null;

  var summoner = userDetails['custom:summoner-name'];
  var accountId = userDetails.accountId;
  return {
    summoner: summoner,
    accountId: accountId
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'dev') {
  __webpack_require__(10).config();
}

var API_KEY = exports.API_KEY = process.env.RIOT_API_KEY;
var USER_POOL_ID = exports.USER_POOL_ID = process.env.USER_POOL_ID;
var APP_CLIENT_ID = exports.APP_CLIENT_ID = process.env.APP_CLIENT_ID;
var POOL_REGION = exports.POOL_REGION = process.env.POOL_REGION;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  name: 'Aatrox',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Aatrox.png',
  key: '266'
}, {
  name: 'Ahri',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ahri.png',
  key: '103'
}, {
  name: 'Akali',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Akali.png',
  key: '84'
}, {
  name: 'Alistar',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Alistar.png',
  key: '12'
}, {
  name: 'Amumu',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Amumu.png',
  key: '32'
}, {
  name: 'Anivia',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Anivia.png',
  key: '34'
}, {
  name: 'Annie',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Annie.png',
  key: '1'
}, {
  name: 'Ashe',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ashe.png',
  key: '22'
}, {
  name: 'Aurelion Sol',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/AurelionSol.png',
  key: '136'
}, {
  name: 'Azir',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Azir.png',
  key: '268'
}, {
  name: 'Bard',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Bard.png',
  key: '432'
}, {
  name: 'Blitzcrank',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Blitzcrank.png',
  key: '53'
}, {
  name: 'Brand',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Brand.png',
  key: '63'
}, {
  name: 'Braum',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Braum.png',
  key: '201'
}, {
  name: 'Caitlyn',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Caitlyn.png',
  key: '51'
}, {
  name: 'Camille',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Camille.png',
  key: '164'
}, {
  name: 'Cassiopeia',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Cassiopeia.png',
  key: '69'
}, {
  name: "Cho'Gath",
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Chogath.png',
  key: '31'
}, {
  name: 'Corki',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Corki.png',
  key: '42'
}, {
  name: 'Darius',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Darius.png',
  key: '122'
}, {
  name: 'Diana',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Diana.png',
  key: '131'
}, {
  name: 'Draven',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Draven.png',
  key: '119'
}, {
  name: 'Dr. Mundo',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/DrMundo.png',
  key: '36'
}, {
  name: 'Ekko',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ekko.png',
  key: '245'
}, {
  name: 'Elise',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Elise.png',
  key: '60'
}, {
  name: 'Evelynn',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Evelynn.png',
  key: '28'
}, {
  name: 'Ezreal',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ezreal.png',
  key: '81'
}, {
  name: 'Fiddlesticks',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Fiddlesticks.png',
  key: '9'
}, {
  name: 'Fiora',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Fiora.png',
  key: '114'
}, {
  name: 'Fizz',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Fizz.png',
  key: '105'
}, {
  name: 'Galio',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Galio.png',
  key: '3'
}, {
  name: 'Gangplank',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Gangplank.png',
  key: '41'
}, {
  name: 'Garen',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Garen.png',
  key: '86'
}, {
  name: 'Gnar',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Gnar.png',
  key: '150'
}, {
  name: 'Gragas',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Gragas.png',
  key: '79'
}, {
  name: 'Graves',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Graves.png',
  key: '104'
}, {
  name: 'Hecarim',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Hecarim.png',
  key: '120'
}, {
  name: 'Heimerdinger',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Heimerdinger.png',
  key: '74'
}, {
  name: 'Illaoi',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Illaoi.png',
  key: '420'
}, {
  name: 'Irelia',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Irelia.png',
  key: '39'
}, {
  name: 'Ivern',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ivern.png',
  key: '427'
}, {
  name: 'Janna',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Janna.png',
  key: '40'
}, {
  name: 'Jarvan IV',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/JarvanIV.png',
  key: '59'
}, {
  name: 'Jax',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Jax.png',
  key: '24'
}, {
  name: 'Jayce',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Jayce.png',
  key: '126'
}, {
  name: 'Jhin',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Jhin.png',
  key: '202'
}, {
  name: 'Jinx',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Jinx.png',
  key: '222'
}, {
  name: 'Kalista',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kalista.png',
  key: '429'
}, {
  name: 'Karma',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Karma.png',
  key: '43'
}, {
  name: 'Karthus',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Karthus.png',
  key: '30'
}, {
  name: 'Kassadin',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kassadin.png',
  key: '38'
}, {
  name: 'Katarina',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Katarina.png',
  key: '55'
}, {
  name: 'Kayle',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kayle.png',
  key: '10'
}, {
  name: 'Kayn',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kayn.png',
  key: '141'
}, {
  name: 'Kennen',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kennen.png',
  key: '85'
}, {
  name: "Kha'Zix",
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Khazix.png',
  key: '121'
}, {
  name: 'Kindred',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kindred.png',
  key: '203'
}, {
  name: 'Kled',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Kled.png',
  key: '240'
}, {
  name: "Kog'Maw",
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/KogMaw.png',
  key: '96'
}, {
  name: 'LeBlanc',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Leblanc.png',
  key: '7'
}, {
  name: 'Lee Sin',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/LeeSin.png',
  key: '64'
}, {
  name: 'Leona',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Leona.png',
  key: '89'
}, {
  name: 'Lissandra',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Lissandra.png',
  key: '127'
}, {
  name: 'Lucian',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Lucian.png',
  key: '236'
}, {
  name: 'Lulu',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Lulu.png',
  key: '117'
}, {
  name: 'Lux',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Lux.png',
  key: '99'
}, {
  name: 'Malphite',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Malphite.png',
  key: '54'
}, {
  name: 'Malzahar',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Malzahar.png',
  key: '90'
}, {
  name: 'Maokai',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Maokai.png',
  key: '57'
}, {
  name: 'Master Yi',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/MasterYi.png',
  key: '11'
}, {
  name: 'Miss Fortune',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/MissFortune.png',
  key: '21'
}, {
  name: 'Wukong',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/MonkeyKing.png',
  key: '62'
}, {
  name: 'Mordekaiser',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Mordekaiser.png',
  key: '82'
}, {
  name: 'Morgana',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Morgana.png',
  key: '25'
}, {
  name: 'Nami',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nami.png',
  key: '267'
}, {
  name: 'Nasus',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nasus.png',
  key: '75'
}, {
  name: 'Nautilus',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nautilus.png',
  key: '111'
}, {
  name: 'Nidalee',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nidalee.png',
  key: '76'
}, {
  name: 'Nocturne',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nocturne.png',
  key: '56'
}, {
  name: 'Nunu',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Nunu.png',
  key: '20'
}, {
  name: 'Olaf',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Olaf.png',
  key: '2'
}, {
  name: 'Orianna',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Orianna.png',
  key: '61'
}, {
  name: 'Ornn',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ornn.png',
  key: '516'
}, {
  name: 'Pantheon',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Pantheon.png',
  key: '80'
}, {
  name: 'Poppy',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Poppy.png',
  key: '78'
}, {
  name: 'Quinn',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Quinn.png',
  key: '133'
}, {
  name: 'Rakan',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Rakan.png',
  key: '497'
}, {
  name: 'Rammus',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Rammus.png',
  key: '33'
}, {
  name: "Rek'Sai",
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/RekSai.png',
  key: '421'
}, {
  name: 'Renekton',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Renekton.png',
  key: '58'
}, {
  name: 'Rengar',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Rengar.png',
  key: '107'
}, {
  name: 'Riven',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Riven.png',
  key: '92'
}, {
  name: 'Rumble',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Rumble.png',
  key: '68'
}, {
  name: 'Ryze',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ryze.png',
  key: '13'
}, {
  name: 'Sejuani',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Sejuani.png',
  key: '113'
}, {
  name: 'Shaco',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Shaco.png',
  key: '35'
}, {
  name: 'Shen',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Shen.png',
  key: '98'
}, {
  name: 'Shyvana',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Shyvana.png',
  key: '102'
}, {
  name: 'Singed',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Singed.png',
  key: '27'
}, {
  name: 'Sion',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Sion.png',
  key: '14'
}, {
  name: 'Sivir',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Sivir.png',
  key: '15'
}, {
  name: 'Skarner',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Skarner.png',
  key: '72'
}, {
  name: 'Sona',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Sona.png',
  key: '37'
}, {
  name: 'Soraka',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Soraka.png',
  key: '16'
}, {
  name: 'Swain',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Swain.png',
  key: '50'
}, {
  name: 'Syndra',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Syndra.png',
  key: '134'
}, {
  name: 'Tahm Kench',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/TahmKench.png',
  key: '223'
}, {
  name: 'Taliyah',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Taliyah.png',
  key: '163'
}, {
  name: 'Talon',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Talon.png',
  key: '91'
}, {
  name: 'Taric',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Taric.png',
  key: '44'
}, {
  name: 'Teemo',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Teemo.png',
  key: '17'
}, {
  name: 'Thresh',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Thresh.png',
  key: '412'
}, {
  name: 'Tristana',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Tristana.png',
  key: '18'
}, {
  name: 'Trundle',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Trundle.png',
  key: '48'
}, {
  name: 'Tryndamere',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Tryndamere.png',
  key: '23'
}, {
  name: 'Twisted Fate',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/TwistedFate.png',
  key: '4'
}, {
  name: 'Twitch',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Twitch.png',
  key: '29'
}, {
  name: 'Udyr',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Udyr.png',
  key: '77'
}, {
  name: 'Urgot',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Urgot.png',
  key: '6'
}, {
  name: 'Varus',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Varus.png',
  key: '110'
}, {
  name: 'Vayne',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Vayne.png',
  key: '67'
}, {
  name: 'Veigar',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Veigar.png',
  key: '45'
}, {
  name: "Vel'Koz",
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Velkoz.png',
  key: '161'
}, {
  name: 'Vi',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Vi.png',
  key: '254'
}, {
  name: 'Viktor',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Viktor.png',
  key: '112'
}, {
  name: 'Vladimir',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Vladimir.png',
  key: '8'
}, {
  name: 'Volibear',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Volibear.png',
  key: '106'
}, {
  name: 'Warwick',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Warwick.png',
  key: '19'
}, {
  name: 'Xayah',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Xayah.png',
  key: '498'
}, {
  name: 'Xerath',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Xerath.png',
  key: '101'
}, {
  name: 'Xin Zhao',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/XinZhao.png',
  key: '5'
}, {
  name: 'Yasuo',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Yasuo.png',
  key: '157'
}, {
  name: 'Yorick',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Yorick.png',
  key: '83'
}, {
  name: 'Zac',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Zac.png',
  key: '154'
}, {
  name: 'Zed',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Zed.png',
  key: '238'
}, {
  name: 'Ziggs',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Ziggs.png',
  key: '115'
}, {
  name: 'Zilean',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Zilean.png',
  key: '26'
}, {
  name: 'Zyra',
  img: 'http://ddragon.leagueoflegends.com/cdn/7.22.1/img/champion/Zyra.png',
  key: '143'
}];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = __webpack_require__(15);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _api = __webpack_require__(1);

var _api2 = _interopRequireDefault(_api);

var _general = __webpack_require__(2);

var _champion = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function epochTimeToDateString(epochInMiliseconds) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCMilliseconds(epochInMiliseconds);
  return d.toISOString();
}

function parseMatchDetailResponse(matchDetail, timeline, summonerId) {
  var participantIdentities = matchDetail.participantIdentities,
      participants = matchDetail.participants,
      gameId = matchDetail.gameId,
      gameCreation = matchDetail.gameCreation;


  var identity = participantIdentities.filter(function (ident) {
    return ident.player.accountId.toString() === summonerId;
  }).map(function (ident) {
    return ident.participantId;
  });

  if (identity.length < 1) {
    return null;
  }
  var targetParticipantId = identity[0];

  /*
  champion	""
  gameId	""
  rank	""
  video	""
  */

  var gameDetails = participants.filter(function (_ref) {
    var participantId = _ref.participantId;
    return participantId === targetParticipantId;
  }).map(function (_ref2) {
    var stats = _ref2.stats,
        timeline = _ref2.timeline,
        teamId = _ref2.teamId,
        championId = _ref2.championId;
    return {
      kills: stats.kills,
      assists: stats.assists,
      deaths: stats.deaths,
      outcome: stats.win ? 'W' : 'L',
      champion: (0, _champion.getChampByKey)(championId),
      role: (0, _general.roleToLane)(timeline.role, timeline.lane),
      // purposely set rank to a single space string
      teamId: teamId
    };
  }).shift();

  gameDetails.gameId = gameId;
  gameDetails.gameDate = epochTimeToDateString(gameCreation);
  gameDetails.cs = [];

  var playerTeam = gameDetails.teamId;

  var partners = participants.filter(function (_ref3) {
    var _ref3$timeline = _ref3.timeline,
        role = _ref3$timeline.role,
        lane = _ref3$timeline.lane;
    return (0, _general.isPartnerRole)(gameDetails.role, role, lane);
  }).map(function (_ref4) {
    var championId = _ref4.championId,
        teamId = _ref4.teamId;
    return {
      champion: (0, _champion.getChampByKey)(championId),
      teamId: teamId
    };
  });

  if (partners.length === 2) {
    var _partners = (0, _slicedToArray3.default)(partners, 2),
        partnerA = _partners[0],
        partnerB = _partners[1];

    gameDetails.partner = partnerA.teamId === gameDetails.teamId ? partnerA.champion : partnerB.champion;

    gameDetails.opponentPartner = partnerA.teamId !== gameDetails.teamId ? partnerA.champion : partnerB.champion;
  } else {
    gameDetails.partner = _champion.UNKNOWN_CHAMPION;
    gameDetails.opponentPartner = _champion.UNKNOWN_CHAMPION;
  }

  // find opponent champion by finding opponent with same role
  var opponent = participants.find(function (_ref5) {
    var participantId = _ref5.participantId,
        _ref5$timeline = _ref5.timeline,
        role = _ref5$timeline.role,
        lane = _ref5$timeline.lane;

    return (0, _general.roleToLane)(role, lane) === gameDetails.role && participantId !== targetParticipantId;
  });

  gameDetails.opponentChampion = opponent ? (0, _champion.getChampByKey)(opponent.championId) : _champion.UNKNOWN_CHAMPION;

  // get minion kills from detailed match history
  timeline.frames.map(function (frame) {
    return {
      timestamp: frame.timestamp,
      min: frame.timestamp / 60000,
      minionsKilled: frame.participantFrames[targetParticipantId].minionsKilled
    };
  }).filter(function (frame) {
    return frame.min > 4.5 && frame.min < 5.5 || frame.min > 9.5 && frame.min < 10.5 || frame.min > 14.5 && frame.min < 15.5 || frame.min > 19.5 && frame.min < 20.5;
  }).forEach(function (_ref6, i) {
    var minionsKilled = _ref6.minionsKilled;
    return gameDetails.cs.push([(i + 1) * 5, minionsKilled]);
  });

  //   cs: [
  // [5, faker.random.number(20)],
  // [10, faker.random.number({ min: 20, max: 70 })],
  // [15, faker.random.number({ min: 70, max: 120 })],
  // [20, faker.random.number({ min: 120, max: 160 })],
  // ],

  return gameDetails;
}

var getMatchDetails = function getMatchDetails(matchId) {
  return _api2.default.get('matches/' + matchId);
};
var getMatchTimeline = function getMatchTimeline(matchId) {
  return _api2.default.get('timelines/by-match/' + matchId);
};

module.exports = function (event, context, callback) {
  if (event.body != null) {
    var body = JSON.parse(event.body);
    var matchId = body.matchId;
    var summonerId = body.summonerId;
    if (matchId != null && summonerId != null) {
      return _promise2.default.all([getMatchDetails(matchId), getMatchTimeline(matchId)]).then(function (fetchResponses) {
        var matchDetail = fetchResponses[0];
        var matchTimeline = fetchResponses[1];
        if (matchDetail.status === 200 && matchDetail.data && matchTimeline.status === 200 && matchTimeline.data) {
          var response = (0, _general.createResp)(200, {
            body: (0, _stringify2.default)(parseMatchDetailResponse(matchDetail.data, matchTimeline.data, summonerId))
          });
          callback(null, response);
        } else {
          callback(null, (0, _general.createResp)(502, {
            error: 'Error retrieving data from riot servers'
          }));
        }
      }).catch(function (error) {
        console.log(error);
        callback(null, (0, _general.createResp)(502, {
          error: 'Error retrieving data from riot servers'
        }));
      });
    }
    callback(null, (0, _general.createResp)(400, { error: 'No match id or summonerId specified' }));
  } else {
    callback(null, (0, _general.createResp)(400, {
      error: 'No match id specified'
    }));
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

var _api = __webpack_require__(1);

var _general = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (event, context, callback) {
  var body = JSON.parse(event.body);
  var summoner = body.summoner;
  if (summoner !== null && summoner !== undefined) {
    return (0, _api.accountEndpoint)(summoner).get().then(function (result) {
      if (result.status === 200 && result.data && result.data.accountId) {
        var response = (0, _general.createResp)(200, {
          body: (0, _stringify2.default)({
            summonerId: result.data.accountId
          })
        });
        callback(null, response);
      } else {
        callback(null, (0, _general.createResp)(502, {
          error: 'Could not retrieve data from riot servers'
        }));
      }
    }).catch(function (error) {
      console.log(error.response.status);
      console.log(error.response.status === 404);
      if (error.response.status === 404) {
        callback(null, (0, _general.createResp)(200, null));
      } else {
        callback(null, (0, _general.createResp)(502, {
          error: 'Error retrieving summoner name from riot servers'
        }));
      }
    });
  } else {
    callback(null, (0, _general.createResp)(400, {
      error: 'No summoner name specified.'
    }));
  }
};

/***/ })
/******/ ])));