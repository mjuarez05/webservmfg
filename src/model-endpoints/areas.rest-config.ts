import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Areas} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Areas,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/areas',
};
module.exports = config;
