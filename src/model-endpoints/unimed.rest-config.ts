import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Unimed} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Unimed,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/unimeds',
};
module.exports = config;
