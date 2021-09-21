"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prodfamilia = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Prodfamilia = class Prodfamilia extends repository_1.Entity {
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
], Prodfamilia.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Prodfamilia.prototype, "idPlanta", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: { columnName: 'descr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Prodfamilia.prototype, "descr", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 10,
        postgresql: { columnName: 'color_back', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Prodfamilia.prototype, "colorBack", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 10,
        postgresql: { columnName: 'color_text', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Prodfamilia.prototype, "colorText", void 0);
Prodfamilia = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'prodfamilia' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Prodfamilia);
exports.Prodfamilia = Prodfamilia;
//# sourceMappingURL=prodfamilia.model.js.map