// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {param, post, put, get, del, requestBody} from '@loopback/rest';
import {AsDetipal, AsHdetipal} from '../../models';
import {AsDetipalRepository, AsHdetipalRepository} from '../../repositories';
import {
  createBelongsToInclusionResolver,
  repository,
} from '@loopback/repository';
import {AsConspalRepository} from '../../repositories/as-conspal.repository';

export class PesadosemelabController {
  AsDetipalRepository: any;
  constructor(
    @repository(AsDetipalRepository)
    public asdetipalRepo: AsDetipalRepository,
    @repository(AsHdetipalRepository)
    public ashdetipalRepo: AsHdetipalRepository,
    @repository(AsConspalRepository)
    public asconspalRepo: AsConspalRepository,
  ) {}

  @put('/greentrz/{idPlanta}/{numpal}/{idArea}')
  async updateDetipal(
    @param.path.number('idPlanta') idPlanta: number,
    @param.path.number('numpal') numpal: number,
    @param.path.number('idArea') idArea: number,
    @requestBody() body: AsDetipal,
  ): Promise<AsDetipal> {
    // let reg = this.asdetipalRepo.findOne({
    //   where: {
    //     idPlanta: idPlanta,
    //     numpal: numpal,
    //     idArea: idArea,
    //   },
    // });
    // this.asdetipalRepo.replaceById();
    let self = this;
    let sqlStmt =
      'UPDATE "greentrz"."as_detipal"	SET unidades=' +
      body.unidades +
      ', tara_pal=' +
      body.taraPal +
      ', tara_bolsa=' +
      body.taraBolsa +
      ', kneto=' +
      body.kneto +
      ', kbruto=' +
      body.kbruto +
      ", fechor_pes='" +
      body.fechorPes +
      "',hora_aper='" +
      body.horaAper +
      "', hora_cierre='" +
      body.horaCierre +
      "', obspallet='" +
      body.obspallet +
      "', id_estado=" +
      body.idEstado +
      '  WHERE id_planta=' +
      idPlanta +
      ' AND numpal=' +
      numpal +
      ' AND id_area=' +
      idArea;

    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/greentrz/pallets/{planta}/{desde}/{hasta}')
  async getDetipal(
    @param.path.number('planta') planta: number,
    @param.path.date('desde') desde: Date,
    @param.path.date('hasta') hasta: Date,
  ): Promise<AsDetipal> {
    let self = this;
    let sqlStmt = `SELECT * FROM "greentrz"."as_detipal"	dp
     LEFT JOIN "greentrz"."as_productos" p ON dp.id_planta=p.id_planta AND dp.id_prod=p.codsap
     LEFT JOIN "public"."prodfamilia" pf on p.id_prdfam=pf.id
     LEFT JOIN "public"."estados" pe on dp.id_estado=pe.id
     WHERE dp.id_planta=${planta} AND dp.fec_prod>='${desde.toISOString()}' AND dp.fec_prod <='${hasta.toISOString()}'
     ORDER BY dp.numpal DESC`;

    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/greentrz/totalAConsumir/{planta}/{fprodfam}')
  async getTotalAConsumir(
    @param.path.number('planta') planta: number,
    @param.path.number('fprodfam') fprodfam: number,
  ): Promise<String> {
    let self = this;
    let sqlStmt = `SELECT
        *
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado in (11,7) AND ad.id_planta=${planta} AND id_prdfam=${fprodfam}`;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/greentrz/totalProducidoFinal/{planta}/{fprodfam}')
  async getTotalProducidoFinal(
    @param.path.number('planta') planta: number,
    @param.path.number('fprodfam') fprodfam: number,
  ): Promise<String> {
    let self = this;
    let sqlStmt = `SELECT
        CASE WHEN SUM(kneto) IS NULL THEN 0
            ELSE SUM(kneto)
        END
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado=5 AND ad.id_planta=${planta} AND id_prdfam=${fprodfam} AND DATE(ad.hora_cierre)=DATE(CURRENT_DATE)`;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @get('/greentrz/totalConsumidoFinal/{planta}/{fprodfam}')
  async getTotalConsumidoFinal(
    @param.path.number('planta') planta: number,
    @param.path.number('fprodfam') fprodfam: number,
  ): Promise<String> {
    let self = this;
    let sqlStmt = `SELECT
        CASE WHEN SUM(kneto) IS NULL THEN 0
            ELSE SUM(kneto)
        END
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado in (7,8) AND ad.id_planta=${planta} AND id_prdfam=${fprodfam} AND DATE(ad.hora_cierre)=DATE(CURRENT_DATE)`;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @del('/greentrz/pallet/{planta}/{numpal}/{usuario}')
  async deletePallet(
    @param.path.number('planta') planta: number,
    @param.path.number('numpal') numpal: number,
    @param.path.number('usuario') usuario: number,
  ): Promise<any> {
    let self = this;
    let sqlStmt = `DELETE FROM "greentrz"."as_detipal" dp WHERE dp.id_planta=${planta} AND dp.numpal=${numpal}`;

    return self.asdetipalRepo
      .execute(sqlStmt, [])
      .then(async (resDel: any) => {
        const resH = await self.ashdetipalRepo.find({
          limit: 1,
          order: ['secuencia DESC'],
          where: {
            numpal: numpal,
          },
        });
        const resC = await self.ashdetipalRepo.create({
          ...resH[0],
          idTipomov:
            new Date(resH[0].fecProd).toLocaleDateString() ===
            new Date().toLocaleDateString()
              ? 2 //Baja Produccion
              : 3, // Baja Remanejo
          secuencia: resH[0].secuencia + 1,
          idUsuario: usuario,
        });
        return {
          rowsDeleted: resDel,
          rowsCreated: resC,
        };
      })
      .catch((err) => {
        return err;
      });
  }

  @get('/greentrz/palletsByNumpal/{numpal}')
  async getPalletsByNumpal(
    @param.path.number('numpal') numpal: number,
  ): Promise<AsDetipal> {
    let self = this;
    let sqlStmt = `SELECT * FROM "greentrz"."as_detipal"	dp
     LEFT JOIN "greentrz"."as_productos" p ON dp.id_planta=p.id_planta AND dp.id_prod=p.codsap
     LEFT JOIN "public"."prodfamilia" pf on p.id_prdfam=pf.id
     WHERE CAST(dp.numpal AS TEXT) LIKE '%${numpal}%'
     ORDER BY dp.numpal DESC`;
    return new Promise<any>(function (resolve, reject) {
      let a = self.asdetipalRepo.execute(sqlStmt, []);
      resolve(a);
    });
  }

  @put('/greentrz/remanejar/{numpal}', {
    responses: {
      '200': {
        description: 'Remanejo de Pallet',
      },
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
      },
    },
  })
  async remanejar(
    @param.path.number('numpal') numpal: number,
    @requestBody() data: any,
  ): Promise<any> {
    //finde pallet in detipal
    let reg: any = await this.asdetipalRepo
      .find({
        where: {numpal: numpal},
      })
      .then((res: any) => {
        //update pallet in detipal

        let sqlStmtUpdate = `UPDATE "greentrz"."as_detipal"  SET intervenido = ${data.intervenido},
        retenido = ${data.retenido} , obsretenido='${data.obsretenido}', obsintervenido='${data.obsintervenido}'`;
        if (data.producto !== null && data.producto !== '') {
          sqlStmtUpdate = sqlStmtUpdate + ', id_prod=' + data.producto;
        }
        sqlStmtUpdate = sqlStmtUpdate + ` WHERE  numpal=${numpal}`;

        return this.asdetipalRepo
          .execute(sqlStmtUpdate, [])
          .then((resUpdate: any) => {
            //find pallet hdetipal
            return this.ashdetipalRepo
              .find({
                limit: 1,
                order: ['secuencia DESC'],
                where: {
                  numpal: numpal,
                },
              })
              .then((resH: AsHdetipal[]) => {
                //create with tipomov 2
                return this.ashdetipalRepo
                  .create({
                    ...resH[0],
                    idTipomov:
                      new Date(resH[0].fecProd).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? 2 // Baja produccion
                        : 3, // Baja Remanejo
                    secuencia: resH[0].secuencia + 1,
                    idUsuario: data.usuario,
                  })
                  .then((resC: any) => {
                    //create with tipomov 1

                    return this.ashdetipalRepo
                      .create({
                        ...resH[0],
                        idProd: data.producto,
                        idUsuario: data.usuario,
                        idTipomov:
                          new Date(resH[0].fecProd).toLocaleDateString() ===
                          new Date().toLocaleDateString()
                            ? 1
                            : 4,
                        secuencia: resH[0].secuencia + 2,
                      })
                      .then((resC2) => {
                        return {
                          rowsUpdated: resUpdate,
                          rowsCreated: [resC, resC2],
                        };
                      })
                      .catch((err) => {
                        return err;
                      });
                  })
                  .catch((err) => {
                    return err;
                  });
              })
              .catch((err) => {
                return err;
              });
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }

  @post('/greentrz/consumo-total/{numpal}/{estado}', {
    responses: {
      '200': {
        description: 'Remanejo de Pallet - Consumo Total',
      },
      content: {
        'application/json': {
          schema: {},
        },
      },
    },
  })
  async remanejarPallet(
    @param.path.number('numpal') numpal: number,
    @param.path.number('estado') estado: number,
    @requestBody() data: any,
  ): Promise<any> {
    //finde pallet in detipal

    let reg: any = await this.asdetipalRepo
      .find({
        where: {numpal: numpal},
      })
      .then((res: any) => {
        //update pallet in detipal
        let sqlStmtUpdate =
          'UPDATE "greentrz"."as_detipal"  SET id_estado = ' +
          estado +
          '  WHERE  numpal=' +
          numpal;

        this.asdetipalRepo
          .execute(sqlStmtUpdate, [])
          .then((resUpdate: any) => {
            //find pallet hdetipal
            this.ashdetipalRepo
              .find({
                limit: 1,
                order: ['secuencia DESC'],
                where: {
                  numpal: numpal,
                },
              })
              .then((resH: AsHdetipal[]) => {
                //create with tipomov 2

                this.ashdetipalRepo
                  .create({
                    ...resH[0],
                    horaAper: new Date(resH[0].horaAper)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    horaCierre: new Date(resH[0].horaCierre)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fechorPes: new Date(resH[0].fechorPes)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecProd: new Date(resH[0].fecProd)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecCong: new Date(resH[0].fecCong)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecVenc: new Date(resH[0].fecVenc)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    idTipomov:
                      new Date(resH[0].fecProd).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? 2 // Baja Produccion
                        : 3, // Baja Remanejo
                    secuencia: resH[0].secuencia + 1,
                    idUsuario: data.idUsuario,
                  })
                  .then((resC: any) => {
                    //create conspal
                    this.asconspalRepo
                      .create(data)
                      .then((resC2) => {
                        return {
                          rowsUpdated: resUpdate,
                          rowsCreated: [resC, resC2],
                        };
                      })
                      .catch((err) => {
                        return err;
                      });
                  })
                  .catch((err) => {
                    console.log('error', err);
                    return err;
                  });
              })
              .catch((err) => {
                console.log('error', err);
                return err;
              });
          })
          .catch((err) => {
            console.log('error', err);
            return err;
          });
      })
      .catch((err) => {
        console.log('error', err);
        return err;
      });
  }

  @post('/greentrz/consumo-parcial/{numpal}/{estado}', {
    responses: {
      '200': {
        description: 'Remanejo de Pallet - Consumo Parcial',
      },
      content: {
        'application/json': {
          schema: {},
        },
      },
    },
  })
  async remanejarPalletParcial(
    @param.path.number('numpal') numpal: number,
    @param.path.number('estado') estado: number,
    @requestBody() data: any,
  ): Promise<any> {
    //finde pallet in detipal

    let reg: any = await this.asdetipalRepo
      .find({
        where: {numpal: numpal},
      })
      .then((res: any) => {
        //update pallet in detipal
        let sqlStmtUpdate = `UPDATE "greentrz"."as_detipal"  SET id_estado=${estado},
          kneto=${data.kresto} ,
          kbruto=${data.kresto} ,
          hora_aper='${data.haper}' , hora_cierre='${data.hcierr}' ,
          unidades=${data.cantbolsas}, id_usuario=${data.idUsuario}
           WHERE  numpal=${numpal}`;

        return this.asdetipalRepo
          .execute(sqlStmtUpdate, [])
          .then((resUpdate: any) => {
            //find pallet hdetipal
            return this.ashdetipalRepo
              .find({
                limit: 1,
                order: ['secuencia DESC'],
                where: {
                  numpal: numpal,
                },
              })
              .then((resH: AsHdetipal[]) => {
                //create with tipomov 2
                return this.ashdetipalRepo
                  .create({
                    ...resH[0],
                    horaAper: new Date(resH[0].horaAper)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    horaCierre: new Date(resH[0].horaCierre)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fechorPes: new Date(resH[0].fechorPes)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecProd: new Date(resH[0].fecProd)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecCong: new Date(resH[0].fecCong)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    fecVenc: new Date(resH[0].fecVenc)
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    idTipomov:
                      new Date(resH[0].fecProd).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? 2 //Baja Produccion
                        : 3, //Baja Remanejo
                    secuencia: resH[0].secuencia + 1,
                    idUsuario: data.idUsuario,
                  })
                  .then((resC: any) => {
                    //create with tipomov 1
                    return this.ashdetipalRepo
                      .create({
                        ...resH[0],
                        horaAper: new Date(resH[0].horaAper)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        horaCierre: new Date(resH[0].horaCierre)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        fechorPes: new Date(resH[0].fechorPes)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        fecProd: new Date(resH[0].fecProd)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        fecCong: new Date(resH[0].fecCong)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        fecVenc: new Date(resH[0].fecVenc)
                          .toISOString()
                          .replace('Z', '')
                          .replace('T', ' '),
                        idUsuario: data.idUsuario,
                        kneto: data.kresto,
                        kbruto: data.kresto,
                        unidades: data.cantbolsas,
                        idTipomov:
                          new Date(resH[0].fecProd).toLocaleDateString() ===
                          new Date().toLocaleDateString()
                            ? 1 //Alta Produccion
                            : 4, //Alta Remanejo
                        secuencia: resH[0].secuencia + 2,
                      })
                      .then((resC2) => {
                        // //create conspal
                        data.knetos = data.kusados;
                        delete data.kusados;
                        delete data.kresto;
                        return this.asconspalRepo
                          .create(data)
                          .then((resC3) => {
                            return {
                              rowsUpdated: resUpdate,
                              rowsCreated: [resC, resC2, resC3],
                            };
                          })
                          .catch((err) => {
                            console.log('error', err);
                            return {...err};
                          });
                      })
                      .catch((err) => {
                        console.log('error', err);
                        return {...err};
                      });
                  })
                  .catch((err) => {
                    console.log('error', err);
                    return {...err};
                  });
              })
              .catch((err) => {
                console.log('error', err);
                return {...err};
              });
          })
          .catch((err) => {
            console.log('error', err);
            return {...err};
          });
      })
      .catch((err) => {
        console.log('error', err);
        return {...err};
      });
  }
}
