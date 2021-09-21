import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsProductos} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsProductos,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-productos',
};
module.exports = config;
