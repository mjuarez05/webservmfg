import openSocket from 'socket.io-client';
import axios from 'axios';

let socketBal = null;

function subscribeSocketBal(trxname, cb) {
  socketBal = openSocket('http://localhost:1212');
  socketBal.on('connect_error', (err) => cb(err, null));
  socketBal.on('pesobalanza', (pesobalanza) => cb(null, pesobalanza));
  socketBal.on('miestado', (miestado) => cb(null, miestado));
  socketBal.on('estadoBalanza', (estadobalanza) => cb(null, estadobalanza));
  socketBal.emit('myTransactionName', trxname);
  socketBal.emit('subscribeGetPesoBal', 300);
  console.log('subscribe', socketBal);
}

// function subscribeGetPesoBal(cb) {
//   socketBal = openSocket('http://localhost:1212');
//   socketBal.on('pesobalanza', (pesobalanza) => cb(null, pesobalanza));
//   socketBal.on('miestado', (miestado) => cb(null, miestado));
//   socketBal.emit('myTransactionName', 'TRXPESADO');
//   socketBal.emit('subscribeGetPesoBal', 300);
//   console.log('subscribe', socketBal);
// }

function unsubscribeSocket() {
  console.log('Unsubscribing', socketBal);
  socketBal?.disconnect();
  socketBal?.destroy();
}

// function subscribeGetEstadoBal(cb) {
//   console.log('subscribe', socketBal);
//   socketBal = openSocket('http://localhost:1212');
//   socketBal.on('estadoBalanza', (estadobalanza) => cb(null, estadobalanza));
//   socketBal.emit('checkEstadoBalanza', 'CHECKSTATUS');
//   socketBal.emit('subscribeGetEstadoBal', 300);
//   console.log('Unsubscribing', socketBal);
// }

function getAllGreenTrzProductos(planta) {
  return axios({
    method: 'GET',
    url: '../as-productos?filter={"where":{"idPlanta":' + planta + '}}',
  });
}

function getGreenTrzProductosByGroup(planta, grupo) {
  return axios({
    method: 'GET',
    url:
      '../as-productos?filter={"where":{"idPlanta":' +
      planta +
      ',"idGrpmat":' +
      grupo +
      '}}',
  });
}

function getGreenTrzProducto(planta, codsap) {
  return axios({
    method: 'GET',
    url:
      '../as-productos?filter={"where":{"idPlanta":' +
      planta +
      ',"codsap":' +
      codsap +
      '}}',
  });
}

function getGreenTrzUltimoPallet(planta, codnumera) {
  return axios({
    method: 'GET',
    url:
      '../cod-numeras?filter={"where":{"id":' +
      codnumera +
      ',"idPlanta":' +
      planta +
      '}}',
  });
}

function initGreenTrzAsDetipals(params) {
  return axios({
    method: 'POST',
    url: '../as-detipals',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
function initGreenTrzAsHDetipals(params) {
  return axios({
    method: 'POST',
    url: '../as-hdetipals',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function cerrarGreenTrzAsDetipals(params) {
  return axios({
    method: 'PUT',
    url:
      '../greentrz/' +
      params.idPlanta +
      '/' +
      params.numpal +
      '/' +
      params.idArea,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function createGreenTrzAsConspalsTotal(data, estado) {
  return axios({
    method: 'POST',
    url: '../greentrz/consumo-total/' + data.idNumpal + '/' + estado,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function createGreenTrzAsConspalsParcial(data, estado) {
  return axios({
    method: 'POST',
    url: '../greentrz/consumo-parcial/' + data.idNumpal + '/' + estado,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getLastPalletActivity(planta, area, puesto) {
  return axios({
    method: 'GET',
    url:
      '../as-detipals?filter={"limit": 10,"skip": 0,"order": ["numpal DESC","fec_prod DESC"],"where":{"idPlanta":' +
      planta +
      ',"idArea":' +
      area +
      ',"ptoPes":' +
      puesto +
      ',"idEstado":2' +
      '}}',
  });
}

function getLastPalletActivityFinal(planta, area, puesto) {
  return axios({
    method: 'GET',
    url:
      '../as-detipals?filter={"limit": 10,"skip": 0,"order": ["numpal DESC","fec_prod DESC"],"where":{"idPlanta":' +
      planta +
      ',"idArea":' +
      area +
      ',"ptoPes":' +
      puesto +
      ',"idEstado":5' +
      '}}',
  });
}

function getTotalAConsumir(planta, prodfam) {
  return axios({
    method: 'GET',
    url: '../greentrz/totalAConsumir/' + planta + '/' + prodfam,
  });
}

function getTotalProducidoFinal(planta, prodfam) {
  return axios({
    method: 'GET',
    url: '../greentrz/totalProducidoFinal/' + planta + '/' + prodfam,
  });
}

function getTotalConsumidoFinal(planta, prodfam) {
  return axios({
    method: 'GET',
    url: '../greentrz/totalConsumidoFinal/' + planta + '/' + prodfam,
  });
}

function getLastPalletOpen(planta, area, puesto) {
  return axios({
    method: 'GET',
    url:
      '../as-detipals?filter={"limit": 1,"skip": 0,"order": ["numpal DESC"],"where":{"idPlanta":' +
      planta +
      ',"idArea":' +
      area +
      ',"idEstado":1' +
      '}}',
  });
}

function getLastPalletOpenProductoFinal(planta, area, puesto) {
  return axios({
    method: 'GET',
    url:
      '../as-detipals?filter={"limit": 1,"skip": 0,"order": ["numpal DESC"],"where":{"idPlanta":' +
      planta +
      ',"idArea":' +
      area +
      ',"idEstado":4' +
      '}}',
  });
}

function getLastPalletConsumoActivity(planta, area, puesto) {
  return axios({
    method: 'GET',
    url:
      '../as-conspals?filter={"limit": 15,"skip": 0,"order": ["hcierr DESC"],"where":{"idPlanta":' +
      planta +
      ',"idArea":' +
      area +
      ',"ptoPes":' +
      puesto +
      ',"idEstado":12' +
      '}}',
  });
}

function incrementNumPall(id, params) {
  return axios({
    method: 'PUT',
    url: '../cod-numeras/' + id,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getGreenTrxAllPalletByDay(planta, desde, hasta) {
  return axios({
    method: 'GET',
    url: '../greentrz/pallets/' + planta + '/' + desde + '/' + hasta,
  });
}

// function getGreenTrxAllPalletByDay(planta, desde, hasta) {
//   return axios({
//     method: 'GET',
//     url:
//       '../as-detipals?filter={"order": ["numpal DESC"],"where":{"idPlanta":' +
//       planta +
//       ',"idArea":' +
//       area +
//       ',  "fec_prod": {"gt":' +
//       desde +
//       '},"fec_prod": {"lt":' +
//       hasta +
//       '}}}',
//   });
// }

// function getGreenTrxAllPalletByDay(planta, area, desde, hasta) {
//   return axios({
//     method: 'GET',
//     url: '../as-detipal/' + planta + '/' + area + '/' + desde + '/' + hasta,
//   });
// }

function getGreenTrxPallet(numpal) {
  return axios({
    method: 'GET',
    url: '../greentrz/palletsByNumpal/' + numpal,
  });
}

function eliminarPallet(planta, numpal, usuario) {
  return axios({
    method: 'DELETE',
    url: '../greentrz/pallet/' + planta + '/' + numpal + '/' + usuario,
  });
}

function remanejarGreenTrxPallet(data) {
  return axios({
    method: 'PUT',
    url: '../greentrz/remanejar/' + data.numpal,
    data: data,
  });
}

function getAllCamaras() {
  return axios({
    method: 'GET',
    url: '../param-cams',
  });
}

function createCamara(camara) {
  return axios({
    method: 'POST',
    url: '../param-cams/',
    data: camara,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function editCamara(camara) {
  return axios({
    method: 'PUT',
    url: '../param-cams/' + camara.id,
    data: camara,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function eliminarCamara(id) {
  return axios({
    method: 'DELETE',
    url: '../param-cams/' + id,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getCamarasPorPlanta(planta) {
  return axios({
    method: 'GET',
    url: '../param-cams?filter={"where":{"idPlanta":' + planta + '}}',
  });
}

function getCamara(id) {
  return axios({
    method: 'GET',
    url: '../param-cams?filter={"where":{"id":' + id + '}}',
  });
}

function getAllPalletByPlant(planta) {
  return axios({
    method: 'GET',
    url: '../as-detipals?filter={"where":{"idPlanta":' + planta + '}}',
  });
}

function getPositionPallet(planta, camara) {
  return axios({
    method: 'GET',
    url: '../as-pospal/getPositionPallet/' + planta + '/' + camara,
  });
}

function setPositionPallet(pos) {
  return axios({
    method: 'POST',
    url: '../as-pospals',
    data: pos,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function putPositionPallet(pos) {
  return axios({
    method: 'PUT',
    url: '../as-pospals/' + pos.id,
    data: pos,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function postPositioHistoryPallet(pos) {
  return axios({
    method: 'POST',
    url: '../as-hpospals/',
    data: pos,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function putEstadoPallet(numpal, estado) {
  return axios({
    method: 'PUT',
    url: '../as-detipal/estado-pallet/' + numpal + '/' + estado,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function putPalletAConsParcial(numpal, estado, data) {
  return axios({
    method: 'PUT',
    url: '../as-detipal/pallet-parcial/' + numpal + '/' + estado,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function deletePositionPallet(id) {
  return axios({
    method: 'DELETE',
    url: '../as-pospals/' + id,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getPalletInCamara(planta) {
  return axios({
    method: 'GET',
    url: '../camaras/getPalletsInCamaras/' + planta,
  });
}

function searchPalletInCamara(planta, numpal) {
  return axios({
    method: 'GET',
    url: '../camaras/getPalletInCamara/' + planta + '/' + numpal,
  });
}

function getPalletDesasociados(planta, estados) {
  return axios({
    method: 'GET',
    url: '../as-detipal/getPalletDesasociados/' + planta + '/' + estados,
  });
}

function getPalletAConsumir(planta) {
  return axios({
    method: 'GET',
    url: '../as-detipal/pallets-a-consumir/' + planta,
  });
}

function getPalletConsumidos(planta) {
  return axios({
    method: 'GET',
    url: '../as-detipal/pallets-consumidos/' + planta,
  });
}

function getProdFamilia(planta) {
  return axios({
    method: 'GET',
    url: '../prodfamilias?filter={"where":{"idPlanta":' + planta + '}}',
  });
}

export {
  // subscribeGetEstadoBal,
  // subscribeGetPesoBal,
  cerrarGreenTrzAsDetipals,
  createGreenTrzAsConspalsTotal,
  createGreenTrzAsConspalsParcial,
  createCamara,
  getTotalConsumidoFinal,
  deletePositionPallet,
  editCamara,
  eliminarCamara,
  getProdFamilia,
  getAllCamaras,
  getAllGreenTrzProductos,
  getTotalAConsumir,
  getAllPalletByPlant,
  getPalletConsumidos,
  getCamara,
  getCamarasPorPlanta,
  getGreenTrxAllPalletByDay,
  getGreenTrxPallet,
  getGreenTrzProducto,
  getGreenTrzProductosByGroup,
  getLastPalletActivityFinal,
  getGreenTrzUltimoPallet,
  getLastPalletActivity,
  getLastPalletOpen,
  getLastPalletConsumoActivity,
  getPalletAConsumir,
  getPalletDesasociados,
  getPalletInCamara,
  getPositionPallet,
  incrementNumPall,
  initGreenTrzAsDetipals,
  initGreenTrzAsHDetipals,
  putPositionPallet,
  putEstadoPallet,
  putPalletAConsParcial,
  remanejarGreenTrxPallet,
  searchPalletInCamara,
  setPositionPallet,
  subscribeSocketBal,
  unsubscribeSocket,
  eliminarPallet,
  getTotalProducidoFinal,
  getLastPalletOpenProductoFinal,
  postPositioHistoryPallet,
};
