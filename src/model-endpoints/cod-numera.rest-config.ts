import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {CodNumera} from '../models';

const config: ModelCrudRestApiConfig = {
  model: CodNumera,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/cod-numeras',
};
module.exports = config;
