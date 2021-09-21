import axios from 'axios';
// import moment from "moment";

const oneday = 60 * 60;

export function getEnviroment() {
  return fetch('./env.json').then((response) => response.json());
}

export function setBaseURLDefault(url) {
  axios.defaults.baseURL = url;
}

export function login(email, password) {
  return axios({
    method: 'POST',
    url: 'usuarios/login',
    data: {
      email: email,
      password: password,
      ttl: oneday,
    },
  });
}

export function logoutAuth() {
  return axios({method: 'POST', url: 'usuarios/logout'});
}

export function isAuth(userid) {
  return axios({
    method: 'GET',
    url: 'usuarios/' + userid,
  });
}
export function setToken() {
  axios.interceptors.request.use(
    function (config) {
      config.params = {access_token: getToken()};
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
}

function getToken() {
  return localStorage.getItem('token');
}

export function killSession(token) {
  axios.interceptors.request.use(
    function (config) {
      config.params = {access_token: ''};
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  return axios({
    method: 'DELETE',
    url: 'accesstokens/' + token,
  });
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  isAuth,
  killSession,
  login,
  logoutAuth,
  setBaseURLDefault,
  setToken,
};
