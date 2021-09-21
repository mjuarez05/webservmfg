"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsConspal = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let AsConspal = class AsConspal extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        // required: true,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 9,
        scale: 0,
        postgresql: { columnName: 'id_numpal', dataType: 'numeric', dataLength: null, dataPrecision: 9, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "idNumpal", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_usuario', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "idUsuario", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 10,
        postgresql: { columnName: 'id_producto', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsConspal.prototype, "idProducto", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 6,
        scale: 3,
        postgresql: { columnName: 'knetos', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "knetos", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        postgresql: { columnName: 'haper', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsConspal.prototype, "haper", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        postgresql: { columnName: 'hcierr', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], AsConspal.prototype, "hcierr", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'cantbolsas', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "cantbolsas", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_area', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], AsConspal.prototype, "idArea", void 0);
AsConspal = tslib_1.__decorate([
    repository_1.model({
        settings: {
            idInjection: false, postgresql: { schema: 'greentrz', table: 'as_conspal' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AsConspal);
exports.AsConspal = AsConspal;
//# sourceMappingURL=as-conspal.model.js.map