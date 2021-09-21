"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolemapping = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Rolemapping = class Rolemapping extends repository_1.Entity {
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
], Rolemapping.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'principaltype', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Rolemapping.prototype, "principaltype", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'principalid', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Rolemapping.prototype, "principalid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'roleid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Rolemapping.prototype, "roleid", void 0);
Rolemapping = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'rolemapping' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Rolemapping);
exports.Rolemapping = Rolemapping;
//# sourceMappingURL=rolemapping.model.js.map