"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsProductos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let AsProductos = class AsProductos extends repository_1.Entity {
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
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 10,
        id: 2,
        postgresql: { columnName: 'codsap', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsProductos.prototype, "codsap", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: { columnName: 'descr_mat', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsProductos.prototype, "descrMat", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: { columnName: 'descr_gen', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsProductos.prototype, "descrGen", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        postgresql: { columnName: 'cantcaj', dataType: 'numeric', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "cantcaj", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'tara_bolsa', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "taraBolsa", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'tara_caja', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "taraCaja", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_unimed', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "idUnimed", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_ftoetq', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "idFtoetq", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 4,
        scale: 0,
        postgresql: { columnName: 'dias_venc', dataType: 'numeric', dataLength: null, dataPrecision: 4, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "diasVenc", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'pesmin', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "pesmin", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'pesmax', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "pesmax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
        postgresql: { columnName: 'activo', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Boolean)
], AsProductos.prototype, "activo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50,
        postgresql: { columnName: 'nsenasa', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], AsProductos.prototype, "nsenasa", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50,
        postgresql: { columnName: 'temp', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], AsProductos.prototype, "temp", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
        postgresql: { columnName: 'ctrl_pesomm', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Boolean)
], AsProductos.prototype, "ctrlPesomm", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'id_grpmat', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "idGrpmat", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'pesfijo', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "pesfijo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'estibamax', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "estibamax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'id_prdfam', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsProductos.prototype, "idPrdfam", void 0);
AsProductos = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'greentrz', table: 'as_productos' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AsProductos);
exports.AsProductos = AsProductos;
//# sourceMappingURL=as-productos.model.js.map