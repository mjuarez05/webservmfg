import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsHpospal} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsHpospal,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-hpospals',
};
module.exports = config;
