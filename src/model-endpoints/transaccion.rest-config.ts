import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Transaccion} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Transaccion,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/transaccions',
};
module.exports = config;
