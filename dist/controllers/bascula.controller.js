"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasculaController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
const net_1 = tslib_1.__importDefault(require("net"));
const BASCULA_RESPONSE = {
    description: 'Bascula Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'BasculaResponse',
                properties: {
                    bascula: { type: 'string' },
                    port: { type: 'number' },
                    peso: { type: 'string' },
                },
            },
        },
    },
};
const BASCULA_VM_RESPONSE = {
    description: 'Bascula Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'BasculaResponse',
                properties: {
                    bascula_VM: { type: 'string' },
                    port: { type: 'number' },
                    peso: { type: 'string' },
                },
            },
        },
    },
};
const BASCULA_SJ_RESPONSE = {
    description: 'Bascula Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'BasculaResponse',
                properties: {
                    bascula_SJ: { type: 'string' },
                    port: { type: 'number' },
                    peso: { type: 'string' },
                },
            },
        },
    },
};
const BASCULA_BA_RESPONSE = {
    description: 'Bascula Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'BasculaResponse',
                properties: {
                    bascula_BA: { type: 'string' },
                    port: { type: 'number' },
                    peso: { type: 'string' },
                },
            },
        },
    },
};
const BASCULA_AS_RESPONSE = {
    description: 'Bascula Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'BasculaResponse',
                properties: {
                    bascula_AS: { type: 'string' },
                    port: { type: 'number' },
                    peso: { type: 'string' },
                },
            },
        },
    },
};
let BasculaController = class BasculaController {
    constructor(req) {
        this.req = req;
    }
    async getSapTest(ip, port) {
        return new Promise((resolve, reject) => {
            let client = new net_1.default.Socket();
            client.on('error', (ex) => {
                console.log('ERROR > ' + ip + ':' + port + ' errorrrr');
                console.log(ex);
                resolve({
                    bascula: ip,
                    port: port,
                    peso: ex,
                });
            });
            client.on('timeout', () => {
                console.log('TIMEOUT > ' + ip + ':' + port + ' timeout error');
                resolve({
                    bascula: ip,
                    port: port,
                    peso: 'timeout',
                });
            });
            client.connect(port, ip, async () => {
                console.log('sssss');
                let pesoBuffer = '';
                client.on('data', async (data) => {
                    pesoBuffer = pesoBuffer.concat(data.toString());
                    console.log('puto el que lee el peso =  ' + pesoBuffer);
                    if (pesoBuffer.toString().indexOf('ST,GS,') !== -1 &&
                        pesoBuffer.toString().indexOf('kg') !== -1) {
                        let peso = pesoBuffer
                            .toString()
                            .split('GS,')[1]
                            .trim()
                            .split(' ')[0];
                        if (peso.length > 0) {
                            client.destroy();
                            resolve({
                                bascula: ip,
                                port: port,
                                peso: peso,
                            });
                        }
                    }
                });
            });
        });
    }
    async vmGetPeso(ip, port) {
        return new Promise((resolve, reject) => {
            let client = new net_1.default.Socket();
            client.on('error', (ex) => {
                console.log('ERROR > ' + ip + ':' + port + ' errorrrr');
                console.log(ex);
                resolve({
                    bascula_VM: ip,
                    port: port,
                    peso: ex,
                });
            });
            client.on('timeout', () => {
                console.log('TIMEOUT > ' + ip + ':' + port + ' timeout error');
                resolve({
                    bascula_VM: ip,
                    port: port,
                    peso: 'timeout',
                });
            });
            client.connect(port, ip, async () => {
                console.log('Comienza Lectura VM');
                let pesoBuffer = '';
                client.on('data', async (data) => {
                    pesoBuffer = pesoBuffer.concat(data.toString());
                    if (pesoBuffer.toString().length >= 14) {
                        let peso = pesoBuffer.substring(4, 10);
                        if (peso.length >= 5) {
                            client.destroy();
                            console.log('Peso OK--> ' + parseInt(pesoBuffer, 10));
                            resolve({
                                bascula_VM: ip,
                                port: port,
                                peso: parseInt(peso, 10),
                            });
                        }
                        ;
                    }
                });
            });
        });
    }
    async sjGetPeso(ip, port) {
        return new Promise((resolve, reject) => {
            let client = new net_1.default.Socket();
            client.on('error', (ex) => {
                console.log('ERROR > ' + ip + ':' + port + ' errorrrr');
                console.log(ex);
                resolve({
                    bascula_SJ: ip,
                    port: port,
                    peso: ex,
                });
            });
            client.on('timeout', () => {
                console.log('TIMEOUT > ' + ip + ':' + port + ' timeout error');
                resolve({
                    bascula_SJ: ip,
                    port: port,
                    peso: 'timeout',
                });
            });
            client.connect(port, ip, async () => {
                console.log('Comienza Lectura SJ');
                let pesoBuffer = '';
                client.on('data', async (data) => {
                    pesoBuffer = pesoBuffer.concat(data.toString());
                    //let pesoBA = pesoBuffer.substring(4, 10);
                    console.log(parseInt(pesoBuffer));
                    if (pesoBuffer.toString().indexOf('ST,GS,') !== -1 &&
                        pesoBuffer.toString().indexOf('kg') !== -1) {
                        let peso = pesoBuffer.toString().split('GS, ')[1].trim().split('kg')[0];
                        if (peso.length > 0) {
                            client.destroy();
                            resolve({
                                bascula_SJ: ip,
                                port: port,
                                peso: parseInt(peso, 10),
                            });
                        }
                    }
                });
            });
        });
    }
    async baGetPeso(ip, port) {
        return new Promise((resolve, reject) => {
            let client = new net_1.default.Socket();
            client.on('error', (ex) => {
                console.log('ERROR > ' + ip + ':' + port + ' errorrrr');
                console.log(ex);
                resolve({
                    bascula_BA: ip,
                    port: port,
                    peso: ex,
                });
            });
            client.on('timeout', () => {
                console.log('TIMEOUT > ' + ip + ':' + port + ' timeout error');
                resolve({
                    bascula_BA: ip,
                    port: port,
                    peso: 'timeout',
                });
            });
            client.connect(port, ip, async () => {
                console.log('Comienza Lectura BA');
                let pesoBuffer = '';
                client.on('data', async (data) => {
                    pesoBuffer = pesoBuffer.concat(data.toString());
                    //let pesoBA = pesoBuffer.substring(4, 10);
                    //console.log('PESO= ' + pesoBA + 'kg');
                    {
                        if (pesoBuffer.toString().length >= 14) {
                            let peso = pesoBuffer.substring(4, 10);
                            if (peso.length >= 5) {
                                client.destroy();
                                resolve({
                                    bascula_BA: ip,
                                    port: port,
                                    peso: parseInt(peso, 10),
                                });
                            }
                            ;
                        }
                    }
                });
            });
        });
    }
    async asGetPeso(ip, port) {
        return new Promise((resolve, reject) => {
            let client = new net_1.default.Socket();
            client.on('error', (ex) => {
                console.log('ERROR > ' + ip + ':' + port + ' errorrrr');
                console.log(ex);
                resolve({
                    bascula_AS: ip,
                    port: port,
                    peso: ex,
                });
            });
            client.on('timeout', () => {
                console.log('TIMEOUT > ' + ip + ':' + port + ' timeout error');
                resolve({
                    bascula_AS: ip,
                    port: port,
                    peso: 'timeout',
                });
            });
            client.connect(port, ip, async () => {
                console.log('Leyendo AS');
                let pesoBuffer = '';
                client.on('data', async (data) => {
                    pesoBuffer = pesoBuffer.concat(data.toString());
                    {
                        if (pesoBuffer.toString().length >= 7) {
                            let peso = pesoBuffer.substring(1);
                            if (peso.length > 0) {
                                client.destroy();
                            }
                            console.log('Peso OK --> ' + parseInt(peso, 10));
                            if (peso.length >= 5) {
                                resolve({
                                    bascula: ip,
                                    port: port,
                                    peso: parseInt(peso, 10),
                                });
                            }
                        }
                        ;
                    }
                });
            });
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/bascula/getPeso', {
        parameters: [
            { name: 'ip', schema: { type: 'string' }, in: 'query' },
            { name: 'port', schema: { type: 'number' }, in: 'query' },
        ],
        responses: {
            '200': BASCULA_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BasculaController.prototype, "getSapTest", null);
tslib_1.__decorate([
    rest_1.get('/bascula/vmGetPeso', {
        parameters: [
            { name: 'ip', schema: { type: 'string' }, in: 'query' },
            { name: 'port', schema: { type: 'number' }, in: 'query' },
        ],
        responses: {
            '200': BASCULA_VM_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BasculaController.prototype, "vmGetPeso", null);
tslib_1.__decorate([
    rest_1.get('/bascula/sjGetPeso', {
        parameters: [
            { name: 'ip', schema: { type: 'string' }, in: 'query' },
            { name: 'port', schema: { type: 'number' }, in: 'query' },
        ],
        responses: {
            '200': BASCULA_SJ_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BasculaController.prototype, "sjGetPeso", null);
tslib_1.__decorate([
    rest_1.get('/bascula/baGetPeso', {
        parameters: [
            { name: 'ip', schema: { type: 'string' }, in: 'query' },
            { name: 'port', schema: { type: 'number' }, in: 'query' },
        ],
        responses: {
            '200': BASCULA_BA_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BasculaController.prototype, "baGetPeso", null);
tslib_1.__decorate([
    rest_1.get('/bascula/asGetPeso', {
        parameters: [
            { name: 'ip', schema: { type: 'string' }, in: 'query' },
            { name: 'port', schema: { type: 'number' }, in: 'query' },
        ],
        responses: {
            '200': BASCULA_AS_RESPONSE,
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BasculaController.prototype, "asGetPeso", null);
BasculaController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__metadata("design:paramtypes", [Object])
], BasculaController);
exports.BasculaController = BasculaController;
//# sourceMappingURL=bascula.controller.js.map