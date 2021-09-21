"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SapController = void 0;
const tslib_1 = require("tslib");
// Uncomment these imports to begin using these cool features!
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
// import {inject} from '@loopback/context';
let Sap = {
    cliente: 'string',
    nombre: 'string',
    pais_sigla: 'string',
    pais_nombre: 'string',
    grupo_sigla: 'string',
    grupo_nombre: 'string',
};
let SapController = class SapController {
    constructor(kna1Repository) {
        this.kna1Repository = kna1Repository;
    }
    async getSapTest(mandt) {
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
        return new Promise(async function (resolve, reject) {
            let a = await self.kna1Repository.execute(sqlStmt, []).then((v) => {
                resolve(v);
            });
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/sap/getSapTest', {
        parameters: [{ name: 'mandt', schema: { type: 'number' }, in: 'query' }],
        responses: {
            '200': {
                description: 'Test Sap',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { Sap } },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SapController.prototype, "getSapTest", null);
SapController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.Kna1Repository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.Kna1Repository])
], SapController);
exports.SapController = SapController;
//# sourceMappingURL=sap.controller.js.map