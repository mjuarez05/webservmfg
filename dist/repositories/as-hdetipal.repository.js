"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsHdetipalRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let AsHdetipalRepository = class AsHdetipalRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.AsHdetipal, dataSource);
    }
};
AsHdetipalRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.MarfrigWebApp')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MarfrigWebAppDataSource])
], AsHdetipalRepository);
exports.AsHdetipalRepository = AsHdetipalRepository;
//# sourceMappingURL=as-hdetipal.repository.js.map