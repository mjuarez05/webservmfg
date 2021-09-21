"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrxparamTransaccionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TrxparamTransaccionController = class TrxparamTransaccionController {
    constructor(trxparamRepository) {
        this.trxparamRepository = trxparamRepository;
    }
    async getTransaccion(id) {
        return this.trxparamRepository.trx(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/trxparams/{id}/transaccion', {
        responses: {
            '200': {
                description: 'Transaccion belonging to Trxparam',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Transaccion) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TrxparamTransaccionController.prototype, "getTransaccion", null);
TrxparamTransaccionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TrxparamRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TrxparamRepository])
], TrxparamTransaccionController);
exports.TrxparamTransaccionController = TrxparamTransaccionController;
//# sourceMappingURL=trxparam-transaccion.controller.js.map