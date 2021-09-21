import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Prodfamilia} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Prodfamilia,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/prodfamilias',
};
module.exports = config;
