"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kna1Repository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let Kna1Repository = class Kna1Repository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.KNA1, dataSource);
    }
};
Kna1Repository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.sap')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.SapDataSource])
], Kna1Repository);
exports.Kna1Repository = Kna1Repository;
//# sourceMappingURL=kna1.repository.js.map