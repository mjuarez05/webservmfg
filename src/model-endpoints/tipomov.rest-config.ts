import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Tipomov} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Tipomov,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/tipomovs',
};
module.exports = config;
