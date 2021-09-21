import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {AsHdetipal} from '../models';

const config: ModelCrudRestApiConfig = {
  model: AsHdetipal,
  pattern: 'CrudRest',
  dataSource: 'MarfrigWebApp',
  basePath: '/as-hdetipals',
};
module.exports = config;
