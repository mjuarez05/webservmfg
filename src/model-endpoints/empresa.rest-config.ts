import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Empresa} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Empresa,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/empresas',
};
module.exports = config;
