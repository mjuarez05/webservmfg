import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Estados} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Estados,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/estados',
};
module.exports = config;
