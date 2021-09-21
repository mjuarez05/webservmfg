import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Plantas} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Plantas,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/plantas',
};
module.exports = config;
