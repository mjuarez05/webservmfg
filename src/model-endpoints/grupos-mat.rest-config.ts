import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {GruposMat} from '../models';

const config: ModelCrudRestApiConfig = {
  model: GruposMat,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/grupos-mats',
};
module.exports = config;
