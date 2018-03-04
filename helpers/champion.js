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
