"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.PesadosemelabController = void 0;
const tslib_1 = require("tslib");
// import {inject} from '@loopback/context';
const rest_1 = require("@loopback/rest");
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
const repository_1 = require("@loopback/repository");
const as_conspal_repository_1 = require("../../repositories/as-conspal.repository");
let PesadosemelabController = class PesadosemelabController {
    constructor(asdetipalRepo, ashdetipalRepo, asconspalRepo) {
        this.asdetipalRepo = asdetipalRepo;
        this.ashdetipalRepo = ashdetipalRepo;
        this.asconspalRepo = asconspalRepo;
    }
    async updateDetipal(idPlanta, numpal, idArea, body) {
        // let reg = this.asdetipalRepo.findOne({
        //   where: {
        //     idPlanta: idPlanta,
        //     numpal: numpal,
        //     idArea: idArea,
        //   },
        // });
        // this.asdetipalRepo.replaceById();
        let self = this;
        let sqlStmt = 'UPDATE "greentrz"."as_detipal"	SET unidades=' +
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
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getDetipal(planta, desde, hasta) {
        let self = this;
        let sqlStmt = `SELECT * FROM "greentrz"."as_detipal"	dp
     LEFT JOIN "greentrz"."as_productos" p ON dp.id_planta=p.id_planta AND dp.id_prod=p.codsap
     LEFT JOIN "public"."prodfamilia" pf on p.id_prdfam=pf.id
     LEFT JOIN "public"."estados" pe on dp.id_estado=pe.id
     WHERE dp.id_planta=${planta} AND dp.fec_prod>='${desde.toISOString()}' AND dp.fec_prod <='${hasta.toISOString()}'
     ORDER BY dp.numpal DESC`;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getTotalAConsumir(planta, fprodfam) {
        let self = this;
        let sqlStmt = `SELECT
        *
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado in (11,7) AND ad.id_planta=${planta} AND id_prdfam=${fprodfam}`;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getTotalProducidoFinal(planta, fprodfam) {
        let self = this;
        let sqlStmt = `SELECT
        CASE WHEN SUM(kneto) IS NULL THEN 0
            ELSE SUM(kneto)
        END
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado=5 AND ad.id_planta=${planta} AND id_prdfam=${fprodfam} AND DATE(ad.hora_cierre)=DATE(CURRENT_DATE)`;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getTotalConsumidoFinal(planta, fprodfam) {
        let self = this;
        let sqlStmt = `SELECT
        CASE WHEN SUM(kneto) IS NULL THEN 0
            ELSE SUM(kneto)
        END
      FROM greentrz.as_detipal ad
      LEFT JOIN greentrz.as_productos ap ON ap.codsap=ad.id_prod
      LEFT JOIN public.prodfamilia pf ON pf.id=ap.id_prdfam
       WHERE ad.id_estado in (7,8) AND ad.id_planta=${planta} AND id_prdfam=${fprodfam} AND DATE(ad.hora_cierre)=DATE(CURRENT_DATE)`;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async deletePallet(planta, numpal, usuario) {
        let self = this;
        let sqlStmt = `DELETE FROM "greentrz"."as_detipal" dp WHERE dp.id_planta=${planta} AND dp.numpal=${numpal}`;
        return self.asdetipalRepo
            .execute(sqlStmt, [])
            .then(async (resDel) => {
            const resH = await self.ashdetipalRepo.find({
                limit: 1,
                order: ['secuencia DESC'],
                where: {
                    numpal: numpal,
                },
            });
            const resC = await self.ashdetipalRepo.create({
                ...resH[0],
                idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                    ? 2 //Baja Produccion
                    : 3,
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
    async getPalletsByNumpal(numpal) {
        let self = this;
        let sqlStmt = `SELECT * FROM "greentrz"."as_detipal"	dp
     LEFT JOIN "greentrz"."as_productos" p ON dp.id_planta=p.id_planta AND dp.id_prod=p.codsap
     LEFT JOIN "public"."prodfamilia" pf on p.id_prdfam=pf.id
     WHERE CAST(dp.numpal AS TEXT) LIKE '%${numpal}%'
     ORDER BY dp.numpal DESC`;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepo.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async remanejar(numpal, data) {
        //finde pallet in detipal
        let reg = await this.asdetipalRepo
            .find({
            where: { numpal: numpal },
        })
            .then((res) => {
            //update pallet in detipal
            let sqlStmtUpdate = `UPDATE "greentrz"."as_detipal"  SET intervenido = ${data.intervenido},
        retenido = ${data.retenido} , obsretenido='${data.obsretenido}', obsintervenido='${data.obsintervenido}'`;
            if (data.producto !== null && data.producto !== '') {
                sqlStmtUpdate = sqlStmtUpdate + ', id_prod=' + data.producto;
            }
            sqlStmtUpdate = sqlStmtUpdate + ` WHERE  numpal=${numpal}`;
            return this.asdetipalRepo
                .execute(sqlStmtUpdate, [])
                .then((resUpdate) => {
                //find pallet hdetipal
                return this.ashdetipalRepo
                    .find({
                    limit: 1,
                    order: ['secuencia DESC'],
                    where: {
                        numpal: numpal,
                    },
                })
                    .then((resH) => {
                    //create with tipomov 2
                    return this.ashdetipalRepo
                        .create({
                        ...resH[0],
                        idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
                            new Date().toLocaleDateString()
                            ? 2 // Baja produccion
                            : 3,
                        secuencia: resH[0].secuencia + 1,
                        idUsuario: data.usuario,
                    })
                        .then((resC) => {
                        //create with tipomov 1
                        return this.ashdetipalRepo
                            .create({
                            ...resH[0],
                            idProd: data.producto,
                            idUsuario: data.usuario,
                            idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
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
    async remanejarPallet(numpal, estado, data) {
        //finde pallet in detipal
        let reg = await this.asdetipalRepo
            .find({
            where: { numpal: numpal },
        })
            .then((res) => {
            //update pallet in detipal
            let sqlStmtUpdate = 'UPDATE "greentrz"."as_detipal"  SET id_estado = ' +
                estado +
                '  WHERE  numpal=' +
                numpal;
            this.asdetipalRepo
                .execute(sqlStmtUpdate, [])
                .then((resUpdate) => {
                //find pallet hdetipal
                this.ashdetipalRepo
                    .find({
                    limit: 1,
                    order: ['secuencia DESC'],
                    where: {
                        numpal: numpal,
                    },
                })
                    .then((resH) => {
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
                        idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
                            new Date().toLocaleDateString()
                            ? 2 // Baja Produccion
                            : 3,
                        secuencia: resH[0].secuencia + 1,
                        idUsuario: data.idUsuario,
                    })
                        .then((resC) => {
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
    async remanejarPalletParcial(numpal, estado, data) {
        //finde pallet in detipal
        let reg = await this.asdetipalRepo
            .find({
            where: { numpal: numpal },
        })
            .then((res) => {
            //update pallet in detipal
            let sqlStmtUpdate = `UPDATE "greentrz"."as_detipal"  SET id_estado=${estado},
          kneto=${data.kresto} ,
          kbruto=${data.kresto} ,
          hora_aper='${data.haper}' , hora_cierre='${data.hcierr}' ,
          unidades=${data.cantbolsas}, id_usuario=${data.idUsuario}
           WHERE  numpal=${numpal}`;
            return this.asdetipalRepo
                .execute(sqlStmtUpdate, [])
                .then((resUpdate) => {
                //find pallet hdetipal
                return this.ashdetipalRepo
                    .find({
                    limit: 1,
                    order: ['secuencia DESC'],
                    where: {
                        numpal: numpal,
                    },
                })
                    .then((resH) => {
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
                        idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
                            new Date().toLocaleDateString()
                            ? 2 //Baja Produccion
                            : 3,
                        secuencia: resH[0].secuencia + 1,
                        idUsuario: data.idUsuario,
                    })
                        .then((resC) => {
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
                            idTipomov: new Date(resH[0].fecProd).toLocaleDateString() ===
                                new Date().toLocaleDateString()
                                ? 1 //Alta Produccion
                                : 4,
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
                                return { ...err };
                            });
                        })
                            .catch((err) => {
                            console.log('error', err);
                            return { ...err };
                        });
                    })
                        .catch((err) => {
                        console.log('error', err);
                        return { ...err };
                    });
                })
                    .catch((err) => {
                    console.log('error', err);
                    return { ...err };
                });
            })
                .catch((err) => {
                console.log('error', err);
                return { ...err };
            });
        })
            .catch((err) => {
            console.log('error', err);
            return { ...err };
        });
    }
};
tslib_1.__decorate([
    rest_1.put('/greentrz/{idPlanta}/{numpal}/{idArea}'),
    tslib_1.__param(0, rest_1.param.path.number('idPlanta')),
    tslib_1.__param(1, rest_1.param.path.number('numpal')),
    tslib_1.__param(2, rest_1.param.path.number('idArea')),
    tslib_1.__param(3, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, models_1.AsDetipal]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "updateDetipal", null);
tslib_1.__decorate([
    rest_1.get('/greentrz/pallets/{planta}/{desde}/{hasta}'),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.date('desde')),
    tslib_1.__param(2, rest_1.param.path.date('hasta')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Date,
        Date]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "getDetipal", null);
tslib_1.__decorate([
    rest_1.get('/greentrz/totalAConsumir/{planta}/{fprodfam}'),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('fprodfam')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "getTotalAConsumir", null);
tslib_1.__decorate([
    rest_1.get('/greentrz/totalProducidoFinal/{planta}/{fprodfam}'),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('fprodfam')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "getTotalProducidoFinal", null);
tslib_1.__decorate([
    rest_1.get('/greentrz/totalConsumidoFinal/{planta}/{fprodfam}'),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('fprodfam')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "getTotalConsumidoFinal", null);
tslib_1.__decorate([
    rest_1.del('/greentrz/pallet/{planta}/{numpal}/{usuario}'),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('numpal')),
    tslib_1.__param(2, rest_1.param.path.number('usuario')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "deletePallet", null);
tslib_1.__decorate([
    rest_1.get('/greentrz/palletsByNumpal/{numpal}'),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "getPalletsByNumpal", null);
tslib_1.__decorate([
    rest_1.put('/greentrz/remanejar/{numpal}', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "remanejar", null);
tslib_1.__decorate([
    rest_1.post('/greentrz/consumo-total/{numpal}/{estado}', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__param(1, rest_1.param.path.number('estado')),
    tslib_1.__param(2, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "remanejarPallet", null);
tslib_1.__decorate([
    rest_1.post('/greentrz/consumo-parcial/{numpal}/{estado}', {
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
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__param(1, rest_1.param.path.number('estado')),
    tslib_1.__param(2, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PesadosemelabController.prototype, "remanejarPalletParcial", null);
PesadosemelabController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.AsDetipalRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.AsHdetipalRepository)),
    tslib_1.__param(2, repository_1.repository(as_conspal_repository_1.AsConspalRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AsDetipalRepository,
        repositories_1.AsHdetipalRepository,
        as_conspal_repository_1.AsConspalRepository])
], PesadosemelabController);
exports.PesadosemelabController = PesadosemelabController;
//# sourceMappingURL=pesadosemelab.controller.js.map