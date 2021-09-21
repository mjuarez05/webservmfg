import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Accesstoken} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Accesstoken,
  pattern: 'CrudRest',
  dataSource: 'sap',
  basePath: '/accesstokens',
};
module.exports = config;
