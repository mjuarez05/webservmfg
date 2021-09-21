"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamarasController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const as_pospal_repository_1 = require("../repositories/as-pospal.repository");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
let CamarasController = class CamarasController {
    constructor(req, aspospalRepository) {
        this.req = req;
        this.aspospalRepository = aspospalRepository;
    }
    async getPalletInCamara(planta, numpal) {
        let self = this;
        let sqlStmt = 'SELECT * FROM "greentrz"."as_pospal" pp ' +
            'LEFT JOIN "greentrz"."as_detipal" dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta AND dp.id_area=pp.id_area ' +
            'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
            'LEFT JOIN "public"."paramCam" pc ON pc.id=pp.id_camara ' +
            'WHERE pp.id_planta=' +
            planta +
            " AND coalesce(CAST(pp.numpal AS text), 'N/A') LIKE '%" +
            numpal +
            "%'";
        return new Promise(function (resolve, reject) {
            let a = self.aspospalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getPalletsInCamaras(planta) {
        let self = this;
        let sqlStmt = 'SELECT *,pp.col as poscol, pp.fila as posfila, pp.altura as posaltura FROM "greentrz"."as_pospal" as pp ' +
            'LEFT JOIN "greentrz"."as_detipal" as dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta and dp.id_area=pp.id_area ' +
            'LEFT JOIN "greentrz"."as_productos" as p ON dp.id_prod=p.codsap ' +
            'LEFT JOIN "public"."paramCam" as pc ON pc.id=pp.id_camara ' +
            'WHERE pp.id_planta=' +
            planta;
        return new Promise(function (resolve, reject) {
            let a = self.aspospalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/camaras/getPalletInCamara/{planta}/{numpal}', {
        responses: {
            '200': {
                description: 'Search in As Pallet in Camara',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('numpal')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CamarasController.prototype, "getPalletInCamara", null);
tslib_1.__decorate([
    rest_1.get('/camaras/getPalletsInCamaras/{planta}', {
        responses: {
            '200': {
                description: 'Search in As Pallet in Camara',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CamarasController.prototype, "getPalletsInCamaras", null);
CamarasController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, repository_1.repository(as_pospal_repository_1.AsPospalRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, as_pospal_repository_1.AsPospalRepository])
], CamarasController);
exports.CamarasController = CamarasController;
//# sourceMappingURL=camaras.controller.js.map