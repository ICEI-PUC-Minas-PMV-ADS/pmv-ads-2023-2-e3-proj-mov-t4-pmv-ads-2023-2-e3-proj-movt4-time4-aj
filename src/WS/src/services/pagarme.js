const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.pagar.me/core/v5',
  withCredentials: true
});

const api_key = require('../data/keys.json').api_key;

module.exports = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, {
      api_key,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF80NjRlZWQzZTM3Zjc0NDlmYmQ2NzI0MmI1ZGM0NzZhMTo='
      },
      ...data,
    });
    return { error: false, data: response.data };
  } catch (err) {
    return {
      error: true,
      message: `ERRORS ${JSON.stringify(err.response.data)}`,
    };
  }
};