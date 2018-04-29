import champList from './champList';

const champMapByKey = {};
const champMapByName = {};

champList.forEach((champ) => {
  champMapByKey[champ.key] = champ.name;
  champMapByName[champ.name] = champ;
});

export const getChampByKey = (key) => {
  return champMapByKey[key];
};

export const getChampByName = (champName) => {
  if (!champName || !(champName in champMapByName)) {
    return champMapByName['Aatrox'];
  }
  return champMapByName[champName];
};

export const UNKNOWN_CHAMPION = 'Unknown';

const bottomChampions = [
  "Ashe",
  "Caitlyn",
  "Draven",
  "Ezreal",
  "Jhin",
  "Jinx",
  "Kalista",
  "Kog Maw",
  "Lucian",
  "Miss Fortune",
  "Sivir",
  "Tristana",
  "Twitch",
  "Urgot",
  "Varus",
  "Vayne",
  "Xayah",
  "Kai'Sa"
]

export function isBottomChampion(champ) {
  return bottomChampions.includes(champ);
}
