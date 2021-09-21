import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Trxparam} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Trxparam,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/trxparams',
};
module.exports = config;
