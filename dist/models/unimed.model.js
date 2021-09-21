"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unimed = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Unimed = class Unimed extends repository_1.Entity {
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
], Unimed.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: { columnName: 'decr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Unimed.prototype, "decr", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 3,
        postgresql: { columnName: 'descr_reduc', dataType: 'character varying', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Unimed.prototype, "descrReduc", void 0);
Unimed = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'unimed' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Unimed);
exports.Unimed = Unimed;
//# sourceMappingURL=unimed.model.js.map