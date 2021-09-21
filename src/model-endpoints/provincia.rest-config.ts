import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Provincia} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Provincia,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/provincias',
};
module.exports = config;
