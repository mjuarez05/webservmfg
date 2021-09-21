"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Usuario = class Usuario extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'nombre', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'apellido', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'realm', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "realm", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'username', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "username", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: { columnName: 'password', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: { columnName: 'email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        postgresql: { columnName: 'emailverified', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", Boolean)
], Usuario.prototype, "emailverified", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        postgresql: { columnName: 'verificationtoken', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
    }),
    tslib_1.__metadata("design:type", String)
], Usuario.prototype, "verificationtoken", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    tslib_1.__metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
Usuario = tslib_1.__decorate([
    repository_1.model({
        settings: { idInjection: false, postgresql: { schema: 'public', table: 'usuario' } }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.model.js.map