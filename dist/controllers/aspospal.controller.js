"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsPospalExtendController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const as_pospal_repository_1 = require("../repositories/as-pospal.repository");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
let AsPospalExtendController = class AsPospalExtendController {
    constructor(req, aspospalRepository) {
        this.req = req;
        this.aspospalRepository = aspospalRepository;
    }
    async getPalletDesasociados(planta, camara) {
        let self = this;
        let sqlStmt = 'SELECT pp.*,prod.*,dp.*,fam.color_text,fam.color_back FROM "greentrz"."as_pospal" pp ' +
            'LEFT JOIN "greentrz"."as_detipal" dp ON dp.numpal=pp.numpal AND dp.id_planta=pp.id_planta AND dp.id_area=pp.id_area ' +
            'LEFT JOIN "greentrz"."as_productos" prod ON dp.id_prod=prod.codsap AND prod.id_planta=dp.id_planta ' +
            'LEFT JOIN "public"."prodfamilia" fam ON fam.id=prod.id_prdfam AND fam.id_planta=prod.id_planta ' +
            'WHERE pp.id_planta=' +
            planta +
            ' and pp.id_camara=' +
            camara;
        return new Promise(function (resolve, reject) {
            let a = self.aspospalRepository.execute(sqlStmt, []);
            resolve(a);
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/as-pospal/getPositionPallet/{planta}/{camara}', {
        responses: {
            '200': {
                description: 'Get All Pallet In Camara',
                content: {
                    'application/json': {
                        schema: { type: 'array' },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('planta')),
    tslib_1.__param(1, rest_1.param.path.number('camara')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AsPospalExtendController.prototype, "getPalletDesasociados", null);
AsPospalExtendController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, repository_1.repository(as_pospal_repository_1.AsPospalRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, as_pospal_repository_1.AsPospalRepository])
], AsPospalExtendController);
exports.AsPospalExtendController = AsPospalExtendController;
//# sourceMappingURL=aspospal.controller.js.map