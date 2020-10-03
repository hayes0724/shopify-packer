const axios = require('axios');

const Environment = require('../utilities/enviroment');

const _headers = () => {
  axios.defaults.headers.common[
    'X-Shopify-Access-Token'
  ] = Environment.getPasswordValue();
  axios.defaults.baseURL = `https://${Environment.getStoreValue()}`;
  axios.defaults.auth = Environment.getPasswordValue();
};

const list = () => {
  _headers();
  return axios
    .get('/admin/themes.json')
    .then((res) => {
      return res.data.themes;
    })
    .catch((error) => {
      return error;
    });
};

const _isMainTheme = async (themeId) => {
  const themes = await list();
  const match = themes.filter((theme) => {
    return theme.id === parseInt(themeId, 10);
  });
  if (match.length < 1) {
    return {
      status: 'error',
      message: `No matching theme found with id: ${themeId}`,
    };
  }
  if (match[0].role === 'main') {
    return {
      status: 'error',
      message: 'Error: you cannot delete the main theme',
    };
  } else {
    return false;
  }
};

module.exports.list = () => {
  return list();
};

module.exports.create = (args) => {
  _headers();
  const data = {
    theme: {
      name: args.name,
    },
  };
  if (args.src) {
    data.theme.src = args.src;
  }
  if (args.role) {
    data.theme.role = args.role;
  }
  return axios
    .post('/admin/themes.json', data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

module.exports.remove = async () => {
  _headers();
  const themeId = Environment.getThemeIdValue();
  const mainTheme = await _isMainTheme(themeId);
  if (mainTheme.status === 'error') {
    return {
      status: mainTheme.status,
      message: mainTheme.message,
    };
  }
  return axios
    .delete(`/admin/themes/${themeId}.json`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

module.exports.download = () => {};
