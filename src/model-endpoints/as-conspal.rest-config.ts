import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsConspal} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsConspal,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-conspals',
};
module.exports = config;
