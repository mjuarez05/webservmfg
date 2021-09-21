"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsDetipal = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let AsDetipal = class AsDetipal extends repository_1.Entity {
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
], AsDetipal.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 9,
        scale: 0,
        id: 2,
        postgresql: {
            columnName: 'numpal',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 9,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "numpal", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 3,
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
], AsDetipal.prototype, "idArea", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'pto_pes',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "ptoPes", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'fechor_pes',
            dataType: 'timestamp without time zone',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "fechorPes", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_turno',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "idTurno", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 10,
        postgresql: {
            columnName: 'id_prod',
            dataType: 'character varying',
            dataLength: 10,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "idProd", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        postgresql: {
            columnName: 'unidades',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 3,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "unidades", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: {
            columnName: 'tara_pal',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 6,
            dataScale: 3,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "taraPal", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: {
            columnName: 'tara_bolsa',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 6,
            dataScale: 3,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "taraBolsa", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 7,
        scale: 3,
        postgresql: {
            columnName: 'kneto',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 7,
            dataScale: 3,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "kneto", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 7,
        scale: 3,
        postgresql: {
            columnName: 'kbruto',
            dataType: 'numeric',
            dataLength: null,
            dataPrecision: 7,
            dataScale: 3,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "kbruto", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'fec_prod',
            dataType: 'string',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "fecProd", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'fec_cong',
            dataType: 'string',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "fecCong", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'fec_venc',
            dataType: 'string',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "fecVenc", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_usuario',
            dataType: 'integer',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "idUsuario", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 20,
        postgresql: {
            columnName: 'lote',
            dataType: 'character varying',
            dataLength: 20,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "lote", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'hora_aper',
            dataType: 'timestamp without time zone',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "horaAper", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'hora_cierre',
            dataType: 'timestamp without time zone',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "horaCierre", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_estado',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsDetipal.prototype, "idEstado", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        postgresql: {
            columnName: 'intervenido',
            dataType: 'boolean',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", Boolean)
], AsDetipal.prototype, "intervenido", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        postgresql: {
            columnName: 'retenido',
            dataType: 'boolean',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", Boolean)
], AsDetipal.prototype, "retenido", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: {
            columnName: 'obsintervenido',
            dataType: 'text',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "obsintervenido", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: {
            columnName: 'obsretenido',
            dataType: 'text',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "obsretenido", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: {
            columnName: 'obspallet',
            dataType: 'text',
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", String)
], AsDetipal.prototype, "obspallet", void 0);
AsDetipal = tslib_1.__decorate([
    repository_1.model({
        settings: {
            idInjection: false,
            strict: false,
            postgresql: { schema: 'greentrz', table: 'as_detipal' },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AsDetipal);
exports.AsDetipal = AsDetipal;
//# sourceMappingURL=as-detipal.model.js.map