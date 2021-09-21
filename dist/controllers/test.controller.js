"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const as_productos_repository_1 = require("../repositories/as-productos.repository");
const as_productos_model_1 = require("../models/as-productos.model");
const repository_1 = require("@loopback/repository");
let TestController = class TestController {
    constructor(asproductosRepository) {
        this.asproductosRepository = asproductosRepository;
    }
    // returns a list of our objects
    async getmodels() {
        return 'models';
    }
    async getProductosByPlant(id) {
        return this.asproductosRepository.find({
            where: {
                idPlanta: id,
            },
        });
    }
    async getProductosByPlant2(id) {
        let self = this;
        let sqlStmt = 'SELECT * FROM "greentrz"."as_productos" WHERE id_planta=' +
            id +
            ' limit 1';
        return new Promise(function (resolve, reject) {
            let a = self.asproductosRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/test/getmodel'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "getmodels", null);
tslib_1.__decorate([
    rest_1.get('/test/getProductosByPlant/{id}', {
        responses: {
            '200': {
                description: 'Search in As Product by plant',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(as_productos_model_1.AsProductos) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "getProductosByPlant", null);
tslib_1.__decorate([
    rest_1.get('/test/getProductosByPlant2/{id}', {
        responses: {
            '200': {
                description: 'Search in As Product by plant',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "getProductosByPlant2", null);
TestController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(as_productos_repository_1.AsProductosRepository)),
    tslib_1.__metadata("design:paramtypes", [as_productos_repository_1.AsProductosRepository])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map