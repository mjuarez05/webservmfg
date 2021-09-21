import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Acl} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Acl,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/acls',
};
module.exports = config;
