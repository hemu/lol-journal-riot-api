const champList = require("./champList");

const champMapByKey = {};
const champMapByName = {};

champList.forEach(champ => {
  champMapByKey[champ.key] = champ.name;
  champMapByName[champ.name] = champ;
});

module.exports.getChampByKey = (key) =>{
  return champMapByKey[key];
}

module.exports.getChampByName = (champName) => {
  if (!champName || !(champName in champMapByName)) {
    return champMapByName["Aatrox"];
  }
  return champMapByName[champName];
}
