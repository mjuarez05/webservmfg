import axios from 'axios';

function getPlantas() {
  return axios({
    method: 'GET',
    url: '../plantas',
  });
}

function getEmpresas() {
  return axios({
    method: 'GET',
    url: '../empresas',
  });
}

function getTurnos(planta) {
  return axios({
    method: 'GET',
    url: '../prd-turnos?filter={"where":{"idPlanta":' + planta + '}}',
  });
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export {getTurnos, getEmpresas, getPlantas};
