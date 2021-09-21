// Uncomment these imports to begin using these cool features!
import {get, param, getModelSchemaRef} from '@loopback/rest';
import {inject} from '@loopback/core';
import {SapDataSource} from '../datasources';
import {repository} from '@loopback/repository';
import {Kna1Repository} from '../repositories';
// import {inject} from '@loopback/context';

let Sap = {
  cliente: 'string',
  nombre: 'string',
  pais_sigla: 'string',
  pais_nombre: 'string',
  grupo_sigla: 'string',
  grupo_nombre: 'string',
};

export class SapController {
  constructor(
    @repository(Kna1Repository)
    public kna1Repository: Kna1Repository,
  ) {}

  @get('/sap/getSapTest', {
    parameters: [{name: 'mandt', schema: {type: 'number'}, in: 'query'}],
    responses: {
      '200': {
        description: 'Test Sap',
        content: {
          'application/json': {
            schema: {type: 'array', items: {Sap}},
          },
        },
      },
    },
  })
  async getSapTest(mandt: number): Promise<any> {
    let self = this;
    let sqlStmt = `SELECT KNA1.KUNNR "cliente",
                      KNA1.NAME1 "nombre" ,
                      KNA1.LAND1 "pais_sigla",
                      T005T.LANDX "pais_nombre",
                      KNA1.KTOKD "grupo_sigla",
                      T077X.TXT30 "grupo_nombre"
                  FROM "SAPABAP1"."KNA1", "SAPABAP1"."T005T" , "SAPABAP1"."T077X"
                  WHERE KNA1.MANDT=${mandt} AND
                    KNA1.MANDT=T005T.MANDT AND
                    KNA1.MANDT=T077X.MANDT AND
                    T005T.SPRAS='S' AND
                    T005T.SPRAS=T077X.SPRAS AND
                    KNA1.KTOKD= 'CLEX' AND
                    KNA1.KTOKD=T077X.KTOKD AND
                    KNA1.LAND1=T005T.LAND1
                  ORDER BY KNA1.KUNNR`;
    return new Promise<any>(async function (resolve, reject) {
      let a = await self.kna1Repository.execute(sqlStmt, []).then((v) => {
        resolve(v);
      });
    });
  }
}
