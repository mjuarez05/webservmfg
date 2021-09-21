import axios from 'axios';

export function getAllUsuario() {
  return axios({
    method: 'GET',
    url: 'usuarios?filter[include]=accessTokens&filter[include]=roles',
  });
}

export function getUsuario(id) {
  return axios({
    method: 'GET',
    url: 'usuarios/' + id,
  });
}

export function getUsuarioTokens(id) {
  return axios({
    method: 'GET',
    url: 'usuarios/' + id + '?filter[include]=accessTokens',
  });
}

export function getUsuarioRoles(id) {
  return axios({
    method: 'GET',
    url: 'usuarios/' + id + '?filter[include]=roles',
  });
}

export function createUsuario(usuario) {
  return axios({method: 'POST', url: 'usuarios', data: usuario});
}

export function addUsuario(usuario) {
  return axios({method: 'POST', url: 'usuarios/add', data: usuario});
}

// export function editUsuario(usuario) {   return axios({method: 'PUT', url:
// "usuarios/edit", data: usuario}) }

export function editUsuario(usuario) {
  return axios({
    method: 'PATCH',
    url: 'usuarios/' + usuario.id,
    data: usuario,
  });
}

export function eliminarUsuario(id) {
  return axios({
    method: 'DELETE',
    url: 'usuarios/' + id,
  });
}

export function addRoleToUser(id, role) {
  return axios({
    method: 'POST',
    url: 'RoleMappings',
    data: {principalType: 'USER', principalId: id, roleId: role.id},
  });
}

export function removeRoleToUser(id, role) {
  return axios({
    method: 'POST',
    url: 'usuarios/' + id + '/removeRole',
    data: {
      role,
    },
  });
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getUsuarioTokens,
  getUsuarioRoles,
  getAllUsuario,
  getUsuario,
  createUsuario,
  editUsuario,
  eliminarUsuario,
  addRoleToUser,
  removeRoleToUser,
};
