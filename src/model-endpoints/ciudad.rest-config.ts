import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Ciudad} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Ciudad,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/ciudads',
};
module.exports = config;
