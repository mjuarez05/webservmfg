"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamCam = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ParamCam = class ParamCam extends repository_1.Entity {
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
        postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        postgresql: { columnName: 'numcam', dataType: 'numeric', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "numcam", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'col', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "col", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'fila', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "fila", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'altura', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "altura", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: { columnName: 'pasillo', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], ParamCam.prototype, "pasillo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        postgresql: { columnName: 'estado', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Boolean)
], ParamCam.prototype, "estado", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'id_grupmat', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], ParamCam.prototype, "idGrupmat", void 0);
ParamCam = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'paramCam' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ParamCam);
exports.ParamCam = ParamCam;
//# sourceMappingURL=param-cam.model.js.map