import {Request, RestBindings, get, param} from '@loopback/rest';

import {AsPospalRepository} from '../repositories/as-pospal.repository';
import {inject} from '@loopback/context';
import net from 'net';
import {AsPospal} from '../models';
import {repository} from '@loopback/repository';

export class CamarasController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(AsPospalRepository)
    public aspospalRepository: AsPospalRepository,
  ) {}

  @get('/camaras/getPalletInCamara/{planta}/{numpal}', {
    responses: {
      '200': {
        description: 'Search in As Pallet in Camara',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletInCamara(
    @param.path.number('planta') planta: typeof AsPospal.prototype.idPlanta,
    @param.path.number('numpal') numpal: typeof AsPospal.prototype.numpal,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT * FROM "greentrz"."as_pospal" pp ' +
      'LEFT JOIN "greentrz"."as_detipal" dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta AND dp.id_area=pp.id_area ' +
      'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
      'LEFT JOIN "public"."paramCam" pc ON pc.id=pp.id_camara ' +
      'WHERE pp.id_planta=' +
      planta +
      " AND coalesce(CAST(pp.numpal AS text), 'N/A') LIKE '%" +
      numpal +
      "%'";
    return new Promise<any>(function (resolve, reject) {
      let a = self.aspospalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/camaras/getPalletsInCamaras/{planta}', {
    responses: {
      '200': {
        description: 'Search in As Pallet in Camara',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletsInCamaras(
    @param.path.number('planta') planta: typeof AsPospal.prototype.idPlanta,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT *,pp.col as poscol, pp.fila as posfila, pp.altura as posaltura FROM "greentrz"."as_pospal" as pp ' +
      'LEFT JOIN "greentrz"."as_detipal" as dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta and dp.id_area=pp.id_area ' +
      'LEFT JOIN "greentrz"."as_productos" as p ON dp.id_prod=p.codsap ' +
      'LEFT JOIN "public"."paramCam" as pc ON pc.id=pp.id_camara ' +
      'WHERE pp.id_planta=' +
      planta;
    return new Promise<any>(function (resolve, reject) {
      let a = self.aspospalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }
}
