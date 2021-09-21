import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsPospal} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsPospal,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-pospals',
};
module.exports = config;
