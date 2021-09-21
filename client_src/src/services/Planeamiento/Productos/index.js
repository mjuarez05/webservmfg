import axios from 'axios';

export function getProductos() {
  return axios({method: 'GET', url: 'productos'});
}

export function setValueProductos(id, col, value) {
  return axios.patch('productos/' + id, {[col]: value});
}

export function createProducto(prudcto) {
  return axios({method: 'POST', url: 'productos', data: prudcto});
}

export function getProducto(prudcto) {
  return axios({method: 'GET', url: 'productos/' + prudcto});
}

export function editarProducto(prudcto) {
  return axios({method: 'PUT', url: 'productos', data: prudcto});
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  createProducto,
  editarProducto,
  getProducto,
  getProductos,
  setValueProductos,
};
