"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accesstoken = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Accesstoken = class Accesstoken extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Accesstoken.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'ttl', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Accesstoken.prototype, "ttl", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'scopes', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Accesstoken.prototype, "scopes", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        postgresql: { columnName: 'created', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Accesstoken.prototype, "created", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        scale: 0,
        postgresql: { columnName: 'userid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Number)
], Accesstoken.prototype, "userid", void 0);
Accesstoken = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'accesstoken' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Accesstoken);
exports.Accesstoken = Accesstoken;
//# sourceMappingURL=accesstoken.model.js.map