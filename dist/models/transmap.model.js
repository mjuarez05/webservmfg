"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transmap = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Transmap = class Transmap extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'transid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Transmap.prototype, "transid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'roleid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Transmap.prototype, "roleid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Transmap.prototype, "id", void 0);
Transmap = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'transmap' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Transmap);
exports.Transmap = Transmap;
//# sourceMappingURL=transmap.model.js.map