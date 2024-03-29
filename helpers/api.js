import axios from 'axios';
import { API_KEY } from './const';

export const accountEndpoint = (name) =>
  axios.create({
    baseURL: `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}`,
    headers: {
      'X-Riot-Token': API_KEY,
    },
  });

export default axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol/match/v3/',
  headers: {
    'X-Riot-Token': API_KEY,
  },
});
