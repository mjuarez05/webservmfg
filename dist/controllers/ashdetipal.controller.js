"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsHDetipalExtendController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const as_hdetipal_repository_1 = require("../repositories/as-hdetipal.repository");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
let AsHDetipalExtendController = class AsHDetipalExtendController {
    constructor(req, asHdetipalRepository) {
        this.req = req;
        this.asHdetipalRepository = asHdetipalRepository;
    }
};
AsHDetipalExtendController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, repository_1.repository(as_hdetipal_repository_1.AsHdetipalRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, as_hdetipal_repository_1.AsHdetipalRepository])
], AsHDetipalExtendController);
exports.AsHDetipalExtendController = AsHDetipalExtendController;
//# sourceMappingURL=ashdetipal.controller.js.map