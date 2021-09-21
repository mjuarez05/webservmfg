import axios from 'axios';

export function getAllPermission() {
  return axios({method: 'GET', url: 'acl'});
}

export function getPermission(id) {
  return axios({
    method: 'GET',
    url: 'ACLs/' + id,
  });
}

export function getRolePermission(rolename) {
  return axios({
    method: 'GET',
    url: 'ACLs?filter[where][principalId]=' + rolename,
  });
}

export function createPermission(permission) {
  return axios({method: 'POST', url: 'ACLs', data: permission});
}

export function editPermission(permission) {
  return axios({method: 'PUT', url: 'ACLs', data: permission});
}

export function eliminarPermission(id) {
  return axios({
    method: 'DELETE',
    url: 'ACLs/' + id,
  });
}

export function findPermission(name) {
  return axios({
    method: 'GET',
    url: 'ACLs?filter[where][name]=' + name,
  });
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  createPermission,
  editPermission,
  eliminarPermission,
  findPermission,
  getAllPermission,
  getPermission,
  getRolePermission,
};
