import axios from 'axios';
import { getLocalStorage } from './localStorageService';

const authToken = getLocalStorage('userInfo')
  ? getLocalStorage('userInfo').sessionKey
  : '';

const instance = axios.create({
  headers: { Authorization: authToken },
});

export default instance;
