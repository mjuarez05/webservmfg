import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Transmap} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Transmap,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/transmaps',
};
module.exports = config;
