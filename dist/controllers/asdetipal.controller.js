"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsDetipalExtendController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const as_detipal_repository_1 = require("../repositories/as-detipal.repository");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
let AsDetipalExtendController = class AsDetipalExtendController {
    constructor(req, asdetipalRepository) {
        this.req = req;
        this.asdetipalRepository = asdetipalRepository;
    }
    async getPalletDesasociados(planta, estados) {
        let self = this;
        let sqlStmt = 'SELECT *,dp.id_planta, dp.numpal, dp.id_area, dp.pto_pes, dp.fechor_pes, dp.id_turno, dp.id_prod, dp.unidades, dp.tara_pal, dp.tara_bolsa, dp.kneto, dp.kbruto, dp.fec_prod, dp.fec_cong, dp.fec_venc, dp.id_usuario, dp.lote, dp.hora_aper, dp.hora_cierre, id_estado ' +
            'FROM "greentrz"."as_detipal" dp ' +
            'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
            'LEFT JOIN "greentrz"."as_pospal" po ON dp.numpal=po.numpal AND dp.id_planta=po.id_planta ' +
            'WHERE id_estado IN (' +
            estados +
            ') AND dp.id_planta=' +
            planta +
            ' AND po.numpal IS NULL ';
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getPalltes(planta, area, prod_desde, prod_hasta) {
        let self = this;
        console.log(prod_desde, prod_hasta);
        let sqlStmt = `SELECT * FROM "greentrz"."as_detipal" dp
      LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap
      LEFT JOIN "public"."estados" e ON dp.id_estadp=p.id
      WHERE id_area= ${area} AND dp.id_planta=${planta} dp.fec_prod>='${prod_desde}'
       dp.fecprod <= '${prod_hasta}'
      ORDER BY dp.numpal DESC`;
        console.log(sqlStmt);
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getPalletAConsumir(planta) {
        let self = this;
        let sqlStmt = 'SELECT * FROM "greentrz"."as_detipal" dp ' +
            'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
            'WHERE id_estado IN (11,7,12) AND dp.id_planta=' +
            planta;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getPalletConsumidos(planta) {
        let self = this;
        let sqlStmt = 'SELECT * FROM "greentrz"."as_detipal" dp ' +
            'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
            'WHERE id_estado IN (8) AND dp.id_planta=' +
            planta;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async getPallet(numpal) {
        let self = this;
        let sqlStmt = 'SELECT * FROM "greentrz"."as_detipal" dp ' +
            'LEFT JOIN "greentrz"."as_productos" p ON dp.id_prod=p.codsap ' +
            'WHERE id_estado IN (2,5) AND dp.numpal=' +
            numpal;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async putEstadoPallet(numpal, estado) {
        let self = this;
        let sqlStmt = 'UPDATE "greentrz"."as_detipal" SET id_estado =' +
            estado +
            '  WHERE numpal=' +
            numpal;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
    async putPalletAConsParcial(numpal, estado, data) {
        let self = this;
        let sqlStmt = 'UPDATE "greentrz"."as_detipal" SET id_estado = ' +
            estado +
            ', unidades=' +
            data.cantbolsas +
            ', kneto=' +
            data.knetos +
            ', kbruto=' +
            data.knetos +
            '   WHERE numpal=' +
            numpal;
        return new Promise(function (resolve, reject) {
            let a = self.asdetipalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/as-detipal/getPalletDesasociados/{planta}/{estados}', {
        responses: {
            '200': {
                description: 'Search in As Pallet Desasociated',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.string('estados')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsDetipalExtendController.prototype, "getPalletDesasociados", null);
tslib_1.__decorate([
    rest_1.get('/as-detipal/{planta}/{area}/{prod_desde}/{prod_hasta}', {
        responses: {
            '200': {
                description: 'Search in As Pallts',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('area')),
    tslib_1.__param(2, rest_1.param.path.string('prod_desde')),
    tslib_1.__param(3, rest_1.param.path.string('prod_hasta')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsDetipalExtendController.prototype, "getPalltes", null);
tslib_1.__decorate([
    rest_1.get('/as-detipal/pallets-a-consumir/{planta}', {
        responses: {
            '200': {
                description: 'Search in As Pallet to Consume',
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
], AsDetipalExtendController.prototype, "getPalletAConsumir", null);
tslib_1.__decorate([
    rest_1.get('/as-detipal/pallets-consumidos/{planta}', {
        responses: {
            '200': {
                description: 'Search in As Pallet Consume',
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
], AsDetipalExtendController.prototype, "getPalletConsumidos", null);
tslib_1.__decorate([
    rest_1.get('/as-detipal/getPallet/{numpal}', {
        responses: {
            '200': {
                description: 'Find Pallet Closed',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsDetipalExtendController.prototype, "getPallet", null);
tslib_1.__decorate([
    rest_1.put('/as-detipal/estado-pallet/{numpal}/{estado}', {
        responses: {
            '200': {
                description: 'change estado pallet',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__param(1, rest_1.param.path.number('estado')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsDetipalExtendController.prototype, "putEstadoPallet", null);
tslib_1.__decorate([
    rest_1.put('/as-detipal/pallet-parcial/{numpal}/{estado}', {
        responses: {
            '200': {
                description: 'change estado pallet',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('numpal')),
    tslib_1.__param(1, rest_1.param.path.number('estado')),
    tslib_1.__param(2, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsDetipalExtendController.prototype, "putPalletAConsParcial", null);
AsDetipalExtendController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, repository_1.repository(as_detipal_repository_1.AsDetipalRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, as_detipal_repository_1.AsDetipalRepository])
], AsDetipalExtendController);
exports.AsDetipalExtendController = AsDetipalExtendController;
//# sourceMappingURL=asdetipal.controller.js.map