import {
  Request,
  RestBindings,
  get,
  put,
  param,
  requestBody,
} from '@loopback/rest';

import {AsDetipalRepository} from '../repositories/as-detipal.repository';
import {inject} from '@loopback/context';
import {AsDetipal} from '../models';
import {repository} from '@loopback/repository';

export class AsDetipalExtendController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(AsDetipalRepository)
    public asdetipalRepository: AsDetipalRepository,
  ) {}

  @get('/as-detipal/getPalletDesasociados/{planta}/{estados}', {
    responses: {
      '200': {
        description: 'Search in As Pallet Desasociated',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletDesasociados(
    @param.path.number('planta') planta: typeof AsDetipal.prototype.idPlanta,
    @param.path.string('estados') estados: typeof String,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT *,dp.id_planta, dp.numpal, dp.id_area, dp.pto_pes, dp.fechor_pes, dp.id_turno, dp.id_prod, dp.unidades, dp.tara_pal, dp.tara_bolsa, dp.kneto, dp.kbruto, dp.fec_prod, dp.fec_cong, dp.fec_venc, dp.id_usuario, dp.lote, dp.hora_aper, dp.hora_cierre, id_estado ' +
      'FROM "greentrz"."as_detipal" dp ' +
      'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
      'LEFT JOIN "greentrz"."as_pospal" po ON dp.numpal=po.numpal AND dp.id_planta=po.id_planta ' +
      'WHERE id_estado IN (' +
      estados +
      ') AND dp.id_planta=' +
      planta +
      ' AND po.numpal IS NULL ';

    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/as-detipal/{planta}/{area}/{prod_desde}/{prod_hasta}', {
    responses: {
      '200': {
        description: 'Search in As Pallts',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalltes(
    @param.path.number('planta') planta: typeof AsDetipal.prototype.idPlanta,
    @param.path.number('area') area: typeof AsDetipal.prototype.idArea,
    @param.path.string('prod_desde')
    prod_desde: typeof AsDetipal.prototype.fecProd,
    @param.path.string('prod_hasta')
    prod_hasta: typeof AsDetipal.prototype.fecProd,
  ): Promise<any> {
    let self = this;
    console.log(prod_desde, prod_hasta);
    let sqlStmt = `SELECT * FROM "greentrz"."as_detipal" dp
      LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap
      LEFT JOIN "public"."estados" e ON dp.id_estadp=p.id
      WHERE id_area= ${area} AND dp.id_planta=${planta} dp.fec_prod>='${prod_desde}'
       dp.fecprod <= '${prod_hasta}'
      ORDER BY dp.numpal DESC`;
    console.log(sqlStmt);
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/as-detipal/pallets-a-consumir/{planta}', {
    responses: {
      '200': {
        description: 'Search in As Pallet to Consume',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletAConsumir(
    @param.path.number('planta') planta: typeof AsDetipal.prototype.idPlanta,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT * FROM "greentrz"."as_detipal" dp ' +
      'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
      'WHERE id_estado IN (11,7,12) AND dp.id_planta=' +
      planta;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/as-detipal/pallets-consumidos/{planta}', {
    responses: {
      '200': {
        description: 'Search in As Pallet Consume',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletConsumidos(
    @param.path.number('planta') planta: typeof AsDetipal.prototype.idPlanta,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT * FROM "greentrz"."as_detipal" dp ' +
      'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
      'WHERE id_estado IN (8) AND dp.id_planta=' +
      planta;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/as-detipal/getPallet/{numpal}', {
    responses: {
      '200': {
        description: 'Find Pallet Closed',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPallet(
    @param.path.number('numpal') numpal: typeof AsDetipal.prototype.numpal,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT * FROM "greentrz"."as_detipal" dp ' +
      'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
      'WHERE id_estado IN (2,5) AND dp.numpal=' +
      numpal;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @put('/as-detipal/estado-pallet/{numpal}/{estado}', {
    responses: {
      '200': {
        description: 'change estado pallet',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async putEstadoPallet(
    @param.path.number('numpal') numpal: typeof AsDetipal.prototype.numpal,
    @param.path.number('estado') estado: typeof AsDetipal.prototype.idEstado,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'UPDATE "greentrz"."as_detipal" SET id_estado =' +
      estado +
      '  WHERE numpal=' +
      numpal;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @put('/as-detipal/pallet-parcial/{numpal}/{estado}', {
    responses: {
      '200': {
        description: 'change estado pallet',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async putPalletAConsParcial(
    @param.path.number('numpal') numpal: typeof AsDetipal.prototype.numpal,
    @param.path.number('estado') estado: typeof AsDetipal.prototype.idEstado,
    @requestBody() data: any,
  ): Promise<any> {
    let self = this;

    let sqlStmt =
      'UPDATE "greentrz"."as_detipal" SET id_estado = ' +
      estado +
      ', unidades=' +
      data.cantbolsas +
      ', kneto=' +
      data.knetos +
      ', kbruto=' +
      data.knetos +
      '   WHERE numpal=' +
      numpal;

    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }
}
