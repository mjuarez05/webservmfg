"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Empresa = class Empresa extends repository_1.Entity {
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
], Empresa.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 100,
        postgresql: { columnName: 'nombre', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Empresa.prototype, "nombre", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 15,
        postgresql: { columnName: 'cuit', dataType: 'character varying', dataLength: 15, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Empresa.prototype, "cuit", void 0);
Empresa = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'empresa' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Empresa);
exports.Empresa = Empresa;
//# sourceMappingURL=empresa.model.js.map