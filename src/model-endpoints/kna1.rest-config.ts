import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {KNA1} from '../models';

const config: ModelCrudRestApiConfig = {
  model: KNA1,
  pattern: 'CrudRest',
  dataSource: 'sap',
  basePath: '/kna1s',
};
module.exports = config;
