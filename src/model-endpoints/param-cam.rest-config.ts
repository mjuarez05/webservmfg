import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {ParamCam} from '../models';

const config: ModelCrudRestApiConfig = {
  model: ParamCam,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/param-cams',
};
module.exports = config;
