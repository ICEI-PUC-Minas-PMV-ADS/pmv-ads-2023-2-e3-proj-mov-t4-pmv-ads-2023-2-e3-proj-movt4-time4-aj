import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.2:8000',//substituir pelo ipv4 do teu wifi
});

export default api;