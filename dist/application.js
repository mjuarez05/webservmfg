"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarfrigWebAppComponent = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const booter_lb3app_1 = require("@loopback/booter-lb3app");
const rest_crud_1 = require("@loopback/rest-crud");
class MarfrigWebAppComponent extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        options = Object.assign({}, {
            rest: {
                url: '192.168.1.100',
                port: 3000,
            },
        }, options);
        this.component(booter_lb3app_1.Lb3AppBooterComponent);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        this.component(rest_crud_1.CrudRestComponent);
    }
}
exports.MarfrigWebAppComponent = MarfrigWebAppComponent;
//# sourceMappingURL=application.js.map