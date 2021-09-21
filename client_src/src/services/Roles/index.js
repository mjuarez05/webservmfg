import axios from 'axios';

export function getAllRole() {
  return axios({method: 'GET', url: 'roles'});
}

export function getRole(id) {
  return axios({
    method: 'GET',
    url: 'roles/' + id,
  });
}

export function createRole(role) {
  return axios({method: 'POST', url: 'roles', data: role});
}

export function editRole(role) {
  return axios({method: 'PUT', url: 'roles', data: role});
}

export function eliminarRole(id) {
  return axios({
    method: 'DELETE',
    url: 'roles/' + id,
  });
}

export function findRole(name) {
  return axios({
    method: 'GET',
    url: 'roles?filter[where][name]=' + name,
  });
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllRole,
  getRole,
  createRole,
  editRole,
  eliminarRole,
  findRole,
};
