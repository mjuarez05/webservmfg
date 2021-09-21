"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrdTurnos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PrdTurnos = class PrdTurnos extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], PrdTurnos.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 2,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], PrdTurnos.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: { columnName: 'descr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], PrdTurnos.prototype, "descr", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        postgresql: { columnName: 'desde', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], PrdTurnos.prototype, "desde", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        postgresql: { columnName: 'hasta', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], PrdTurnos.prototype, "hasta", void 0);
PrdTurnos = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'prd_turnos' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], PrdTurnos);
exports.PrdTurnos = PrdTurnos;
//# sourceMappingURL=prd-turnos.model.js.map