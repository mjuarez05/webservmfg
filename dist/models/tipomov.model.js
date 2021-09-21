"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipomov = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Tipomov = class Tipomov extends repository_1.Entity {
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
        postgresql: { columnName: 'tipo', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Tipomov.prototype, "tipo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 2,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Tipomov.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: { columnName: 'descr', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Tipomov.prototype, "descr", void 0);
Tipomov = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'tipomov' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Tipomov);
exports.Tipomov = Tipomov;
//# sourceMappingURL=tipomov.model.js.map