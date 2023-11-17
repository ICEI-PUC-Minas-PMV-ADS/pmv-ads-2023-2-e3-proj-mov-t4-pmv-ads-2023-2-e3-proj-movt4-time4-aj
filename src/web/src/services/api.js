import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  // headers: {
  //   Authorization: 'a7c360b6a7a1986ecd15027956d3b39d',
  // },
});

export default api;
