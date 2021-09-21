import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Role} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Role,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/roles',
};
module.exports = config;
