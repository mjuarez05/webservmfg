import {get, param, getModelSchemaRef} from '@loopback/rest';
import {Application, CoreBindings, inject} from '@loopback/core';
import {AsProductosRepository} from '../repositories/as-productos.repository';
import {AsProductos} from '../models/as-productos.model';
import {repository} from '@loopback/repository';

export class TestController {
  constructor(
    @repository(AsProductosRepository)
    public asproductosRepository: AsProductosRepository,
  ) {}

  // returns a list of our objects
  @get('/test/getmodel')
  async getmodels(): Promise<string> {
    return 'models';
  }

  @get('/test/getProductosByPlant/{id}', {
    responses: {
      '200': {
        description: 'Search in As Product by plant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsProductos)},
          },
        },
      },
    },
  })
  async getProductosByPlant(
    @param.path.number('id') id: typeof AsProductos.prototype.idPlanta,
  ): Promise<AsProductos[]> {
    return this.asproductosRepository.find({
      where: {
        idPlanta: id,
      },
    });
  }

  @get('/test/getProductosByPlant2/{id}', {
    responses: {
      '200': {
        description: 'Search in As Product by plant',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getProductosByPlant2(
    @param.path.number('id') id: typeof AsProductos.prototype.idPlanta,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT * FROM "greentrz"."as_productos" WHERE id_planta=' +
      id +
      ' limit 1';
    return new Promise<any>(function (resolve, reject) {
      let a = self.asproductosRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }
}
