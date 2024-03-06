import axios from 'axios';

// const url = 'http://localhost:8080';
const url = 'http://canhoto.srembalagens.com.br:3002';

export const Api = axios.create({
  baseURL: url,
});
