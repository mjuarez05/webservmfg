"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodNumera = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CodNumera = class CodNumera extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        //required: true,
        scale: 0,
        id: 1,
        postgresql: {
            columnName: 'id',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], CodNumera.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        //// required: true,
        scale: 0,
        id: 2,
        postgresql: {
            columnName: 'id_planta',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], CodNumera.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        //required: true,
        scale: 0,
        postgresql: {
            columnName: 'numdde',
            dataType: 'bigint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], CodNumera.prototype, "numdde", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        //required: true,
        scale: 0,
        postgresql: {
            columnName: 'numhta',
            dataType: 'bigint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], CodNumera.prototype, "numhta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        //required: true,
        scale: 0,
        postgresql: {
            columnName: 'ultusado',
            dataType: 'bigint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], CodNumera.prototype, "ultusado", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        //required: true,
        postgresql: {
            columnName: 'renovauto',
            dataType: 'boolean',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Boolean)
], CodNumera.prototype, "renovauto", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        //required: true,
        length: 100,
        postgresql: {
            columnName: 'descr',
            dataType: 'character varying',
            dataLength: 100,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], CodNumera.prototype, "descr", void 0);
CodNumera = tslib_1.__decorate([
    repository_1.model({
        settings: {
            idInjection: false,
            postgresql: { schema: 'public', table: 'cod_numera' },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CodNumera);
exports.CodNumera = CodNumera;
//# sourceMappingURL=cod-numera.model.js.map