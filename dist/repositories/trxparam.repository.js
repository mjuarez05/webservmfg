"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrxparamRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let TrxparamRepository = class TrxparamRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, plantasRepositoryGetter, transaccionRepositoryGetter) {
        super(models_1.Trxparam, dataSource);
        this.plantasRepositoryGetter = plantasRepositoryGetter;
        this.transaccionRepositoryGetter = transaccionRepositoryGetter;
        this.trx = this.createBelongsToAccessorFor('trx', transaccionRepositoryGetter);
        this.registerInclusionResolver('trx', this.trx.inclusionResolver);
        this.planta = this.createBelongsToAccessorFor('planta', plantasRepositoryGetter);
        this.registerInclusionResolver('planta', this.planta.inclusionResolver);
    }
};
TrxparamRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.MarfrigWebApp')), tslib_1.__param(1, repository_1.repository.getter('PlantasRepository')), tslib_1.__param(2, repository_1.repository.getter('TransaccionRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MarfrigWebAppDataSource, Function, Function])
], TrxparamRepository);
exports.TrxparamRepository = TrxparamRepository;
//# sourceMappingURL=trxparam.repository.js.map