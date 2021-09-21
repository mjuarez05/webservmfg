import {Request, RestBindings, get, param} from '@loopback/rest';

import {AsPospalRepository} from '../repositories/as-pospal.repository';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {AsPospal} from '../models/as-pospal.model';

export class AsPospalExtendController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(AsPospalRepository)
    public aspospalRepository: AsPospalRepository,
  ) {}

  @get('/as-pospal/getPositionPallet/{planta}/{camara}', {
    responses: {
      '200': {
        description: 'Get All Pallet In Camara',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async getPalletDesasociados(
    @param.path.number('planta') planta: typeof AsPospal.prototype.idPlanta,
    @param.path.number('camara') camara: typeof AsPospal.prototype.idCamara,
  ): Promise<any> {
    let self = this;
    let sqlStmt =
      'SELECT pp.*,prod.*,dp.*,fam.color_text,fam.color_back FROM "greentrz"."as_pospal" pp ' +
      'LEFT JOIN "greentrz"."as_detipal" dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta AND dp.id_area=pp.id_area ' +
      'LEFT JOIN "greentrz"."as_productos" prod ON dp.id_prod=prod.codsap AND prod.id_planta=dp.id_planta ' +
      'LEFT JOIN "public"."prodfamilia" fam ON fam.id=prod.id_prdfam AND fam.id_planta=prod.id_planta ' +
      'WHERE pp.id_planta=' +
      planta +
      ' and pp.id_camara=' +
      camara;
    return new Promise<any>(function (resolve, reject) {
      let a = self.aspospalRepository.execute(sqlStmt, []);
      resolve(a);
    });
  }
}
