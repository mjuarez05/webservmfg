"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estados = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Estados = class Estados extends repository_1.Entity {
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
        postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Estados.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 2,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Estados.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: { columnName: 'descr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Estados.prototype, "descr", void 0);
Estados = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'estados' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Estados);
exports.Estados = Estados;
//# sourceMappingURL=estados.model.js.map