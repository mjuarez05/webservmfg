import axios from 'axios';

function groupByParams(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function getAllTrxParam() {
  return axios({
    method: 'GET',
    url:
      '../trxparams?filter[include][0][relation]=planta&filter[include][1][relation]=trx',
  });
}

function getTrxParam(planta) {
  return axios({
    method: 'GET',
    url: '../trxparams?filter={"where":{"idPlanta":' + planta + '}}',
  });
}

function getTrxParamByPlantaAndTrx(planta, trx) {
  return axios({
    method: 'GET',
    url:
      '../trxparams?filter={"where":{"id_planta":' +
      planta +
      ',"id_trx":' +
      trx +
      '}}',
  });
}

function createTrxParam(param) {
  return axios({method: 'POST', url: '../trxparams', data: param});
}

function editTrxParam(param) {
  return axios({
    method: 'PUT',
    url: '../trxparams/' + param.id,
    data: param,
  });
}

function eliminarTrxParam(id) {
  return axios({
    method: 'DELETE',
    url: '../trxparams/' + id,
  });
}

async function checkTrxParamsNeed(getting, need) {
  if (!getting || !need) return;
  let arrayParam = await groupByParams(getting, 'descr');
  if (Object.keys(arrayParam).length !== need.length) return;
  return Object.keys(arrayParam).every((e) => need.includes(e));
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export {
  getTrxParam,
  getAllTrxParam,
  createTrxParam,
  editTrxParam,
  eliminarTrxParam,
  getTrxParamByPlantaAndTrx,
  checkTrxParamsNeed,
  groupByParams,
};
