"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsHdetipal = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let AsHdetipal = class AsHdetipal extends repository_1.Entity {
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
], AsHdetipal.prototype, "idPlanta", void 0);
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
], AsHdetipal.prototype, "numpal", void 0);
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
], AsHdetipal.prototype, "idArea", void 0);
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
], AsHdetipal.prototype, "ptoPes", void 0);
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
], AsHdetipal.prototype, "fechorPes", void 0);
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
], AsHdetipal.prototype, "idTurno", void 0);
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
], AsHdetipal.prototype, "idProd", void 0);
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
], AsHdetipal.prototype, "unidades", void 0);
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
], AsHdetipal.prototype, "taraPal", void 0);
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
], AsHdetipal.prototype, "taraBolsa", void 0);
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
], AsHdetipal.prototype, "kneto", void 0);
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
], AsHdetipal.prototype, "kbruto", void 0);
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
], AsHdetipal.prototype, "fecProd", void 0);
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
], AsHdetipal.prototype, "fecCong", void 0);
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
], AsHdetipal.prototype, "fecVenc", void 0);
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
], AsHdetipal.prototype, "idUsuario", void 0);
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
], AsHdetipal.prototype, "lote", void 0);
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
], AsHdetipal.prototype, "horaAper", void 0);
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
], AsHdetipal.prototype, "horaCierre", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 4,
        postgresql: {
            columnName: 'secuencia',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHdetipal.prototype, "secuencia", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: {
            columnName: 'numbal',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'YES',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHdetipal.prototype, "numbal", void 0);
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
], AsHdetipal.prototype, "idEstado", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: {
            columnName: 'id_tipomov',
            dataType: 'smallint',
            dataLength: null,
            dataPrecision: null,
            dataScale: 0,
            nullable: 'NO',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], AsHdetipal.prototype, "idTipomov", void 0);
AsHdetipal = tslib_1.__decorate([
    repository_1.model({
        settings: {
            strict: false,
            idInjection: false,
            postgresql: { schema: 'greentrz', table: 'as_hdetipal' },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AsHdetipal);
exports.AsHdetipal = AsHdetipal;
//# sourceMappingURL=as-hdetipal.model.js.map