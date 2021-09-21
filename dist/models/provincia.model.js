"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provincia = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Provincia = class Provincia extends repository_1.Entity {
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
], Provincia.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50,
        postgresql: { columnName: 'provincia_nombre', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Provincia.prototype, "provinciaNombre", void 0);
Provincia = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'provincia' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Provincia);
exports.Provincia = Provincia;
//# sourceMappingURL=provincia.model.js.map