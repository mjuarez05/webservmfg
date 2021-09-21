"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsHpospal = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let AsHpospal = class AsHpospal extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
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
], AsHpospal.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'numpal',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "numpal", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'usuario',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "usuario", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'fecha',
            dataType: 'timestamp without time zone',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsHpospal.prototype, "fecha", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_camara',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "idCamara", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'col',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "col", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'fila',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "fila", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'altura',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "altura", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
        postgresql: {
            columnName: 'estado',
            dataType: 'boolean',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Boolean)
], AsHpospal.prototype, "estado", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_area',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHpospal.prototype, "idArea", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        // required: true,
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
], AsHpospal.prototype, "id", void 0);
AsHpospal = tslib_1.__decorate([
    repository_1.model({
        settings: {
            strict: 'filter',
            idInjection: false,
            postgresql: { schema: 'greentrz', table: 'as_hpospal' },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AsHpospal);
exports.AsHpospal = AsHpospal;
//# sourceMappingURL=as-hpospal.model.js.map