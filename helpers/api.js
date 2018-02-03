import axios from 'axios';
import { API_KEY } from './const';

export default axios.create({
  baseURL: 'https://na1.api.riotgames.com/lol/match/v3/',
  headers: {
    'X-Riot-Token': API_KEY,
  },
});
