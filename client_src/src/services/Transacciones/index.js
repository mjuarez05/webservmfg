import axios from 'axios';

export function getAllTRX() {
  return axios({method: 'GET', url: 'transacciones'});
}

export function getTRX(id) {
  return axios({
    method: 'GET',
    url: 'transacciones/' + id,
  });
}

export function createTRX(trx) {
  return axios({method: 'POST', url: 'transacciones', data: trx});
}

export function editTRX(trx) {
  return axios({method: 'PUT', url: 'transacciones', data: trx});
}

export function getFullMenu() {
  return axios({
    method: 'GET',
    url:
      'transacciones?filter[where][menuId]=0&filter[include][children][children][children][children][children][children][children]=children',
  });
}

export function getUserMenuByUser(userId) {
  return axios({
    method: 'GET',
    url: 'transacciones/getUserMenu?id=' + userId,
  });
}

export function eliminarTRX(id) {
  return axios({
    method: 'DELETE',
    url: 'transacciones/' + id,
  });
}

export function findTRX(trx) {
  return axios({
    method: 'GET',
    url: 'transacciones/findOne?filter[where][trx]=' + trx,
  });
}

export function getRoleTrx(trx) {
  return axios({
    method: 'GET',
    url: 'transacciones?filter[where][id]=' + trx + '&filter[include][roles]',
  });
}

export function findTRXRole(trxid, roleid) {
  return axios({
    method: 'GET',
    url:
      'transmaps?filter[where][transId]=' +
      trxid +
      '&filter[where][roleId]=' +
      roleid,
  });
}

export function addTRXToRol(trx, role) {
  return axios({
    method: 'POST',
    url: 'transmaps',
    data: {
      transId: trx,
      roleId: role,
    },
  });
}

export function removeTRXFromRol(trxid) {
  return axios({
    method: 'DELETE',
    url: 'transmaps/' + trxid,
  });
}

export function getAllModels() {
  return axios({method: 'GET', url: 'transacciones/getModels'});
}

export function getAllMethods(modelName) {
  return axios({
    method: 'GET',
    url: 'transacciones/getMethods?model=' + modelName,
  });
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllTRX,
  getTRX,
  createTRX,
  editTRX,
  eliminarTRX,
  getFullMenu,
  findTRX,
  getRoleTrx,
  addTRXToRol,
  removeTRXFromRol,
  getAllModels,
  getAllMethods,
  getUserMenuByUser,
};
