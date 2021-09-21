"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ciudad = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Ciudad = class Ciudad extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 5,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Ciudad.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 60,
        postgresql: { columnName: 'ciudad_nombre', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Ciudad.prototype, "ciudadNombre", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        precision: 5,
        scale: 0,
        postgresql: { columnName: 'cp', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Ciudad.prototype, "cp", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'provincia_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Ciudad.prototype, "provinciaId", void 0);
Ciudad = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'ciudad' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Ciudad);
exports.Ciudad = Ciudad;
//# sourceMappingURL=ciudad.model.js.map