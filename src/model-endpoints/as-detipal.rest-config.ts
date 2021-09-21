import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsDetipal} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsDetipal,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-detipals',
};
module.exports = config;
