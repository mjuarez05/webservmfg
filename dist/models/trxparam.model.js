"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trxparam = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const plantas_model_1 = require("./plantas.model");
const transaccion_model_1 = require("./transaccion.model");
let Trxparam = class Trxparam extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: {
            columnName: 'descr',
            dataType: 'character varying',
            dataLength: 50,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], Trxparam.prototype, "descr", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: {
            columnName: 'valor',
            dataType: 'character varying',
            dataLength: 100,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], Trxparam.prototype, "valor", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: false,
        scale: 0,
        id: 1,
        postgresql: {
            columnName: 'id',
            dataType: 'integer',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Trxparam.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => plantas_model_1.Plantas, { name: 'planta' }),
    tslib_1.__metadata("design:type", Number)
], Trxparam.prototype, "id_planta", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => transaccion_model_1.Transaccion, { name: 'trx' }),
    tslib_1.__metadata("design:type", Number)
], Trxparam.prototype, "id_trx", void 0);
Trxparam = tslib_1.__decorate([
    repository_1.model({
        settings: {
            idInjection: false,
            postgresql: { schema: 'public', table: 'trxparam' },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Trxparam);
exports.Trxparam = Trxparam;
//# sourceMappingURL=trxparam.model.js.map