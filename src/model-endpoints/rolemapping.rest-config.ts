import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Rolemapping} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Rolemapping,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/rolemappings',
};
module.exports = config;
