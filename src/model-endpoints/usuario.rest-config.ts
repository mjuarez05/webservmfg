import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Usuario} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Usuario,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/usuarios',
};
module.exports = config;
