import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {PrdTurnos} from '../models';

const config: ModelCrudRestApiConfig = {
  model: PrdTurnos,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/prd-turnos',
};
module.exports = config;
