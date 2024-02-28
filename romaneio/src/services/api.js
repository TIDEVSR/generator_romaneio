import axios from 'axios';

const url = 'http://localhost:8080';

export const Api = axios.create({
  baseURL: url,
});
