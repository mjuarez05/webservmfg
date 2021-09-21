"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plantas = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Plantas = class Plantas extends repository_1.Entity {
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
], Plantas.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'empresa', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Plantas.prototype, "empresa", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'sucursal', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Plantas.prototype, "sucursal", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: { columnName: 'descripcion', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Plantas.prototype, "descripcion", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50,
        postgresql: { columnName: 'oncca', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Plantas.prototype, "oncca", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50,
        postgresql: { columnName: 'senasa', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Plantas.prototype, "senasa", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'numplant', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Plantas.prototype, "numplant", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        postgresql: { columnName: 'direccion', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Plantas.prototype, "direccion", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_provincia', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Plantas.prototype, "idProvincia", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 5,
        scale: 0,
        postgresql: { columnName: 'id_ciudad', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Plantas.prototype, "idCiudad", void 0);
Plantas = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'plantas' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Plantas);
exports.Plantas = Plantas;
//# sourceMappingURL=plantas.model.js.map