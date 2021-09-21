"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNA1 = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let KNA1 = class KNA1 extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], KNA1.prototype, "MANDT", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], KNA1.prototype, "KUNNR", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], KNA1.prototype, "NAME1", void 0);
KNA1 = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], KNA1);
exports.KNA1 = KNA1;
//# sourceMappingURL=kna1.model.js.map