import { Request, RestBindings, get, ResponseObject } from '@loopback/rest';
import { inject } from '@loopback/context';
import net from 'net';

const BASCULA_RESPONSE: ResponseObject = {
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

const BASCULA_VM_RESPONSE: ResponseObject = {
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

const BASCULA_SJ_RESPONSE: ResponseObject = {
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

const BASCULA_BA_RESPONSE: ResponseObject = {
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

const BASCULA_AS_RESPONSE: ResponseObject = {
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

export class BasculaController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  @get('/bascula/getPeso', {
    parameters: [
      { name: 'ip', schema: { type: 'string' }, in: 'query' },
      { name: 'port', schema: { type: 'number' }, in: 'query' },
    ],
    responses: {
      '200': BASCULA_RESPONSE,
    },
  })
  async getSapTest(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let client = new net.Socket();
      client.on('error', (ex: object) => {
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
        client.on('data', async (data: Buffer) => {
          pesoBuffer = pesoBuffer.concat(data.toString());
          console.log('puto el que lee el peso =  ' + pesoBuffer);
          if (
            pesoBuffer.toString().indexOf('ST,GS,') !== -1 &&
            pesoBuffer.toString().indexOf('kg') !== -1
          ) {
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

  @get('/bascula/vmGetPeso', {
    parameters: [
      { name: 'ip', schema: { type: 'string' }, in: 'query' },
      { name: 'port', schema: { type: 'number' }, in: 'query' },
    ],
    responses: {
      '200': BASCULA_VM_RESPONSE,
    },
  })
  async vmGetPeso(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let client = new net.Socket();
      client.on('error', (ex: object) => {
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
        client.on('data', async (data: Buffer) => {

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
              })
            };
          }
        });
      });
    });
  }

  @get('/bascula/sjGetPeso', {
    parameters: [
      { name: 'ip', schema: { type: 'string' }, in: 'query' },
      { name: 'port', schema: { type: 'number' }, in: 'query' },
    ],
    responses: {
      '200': BASCULA_SJ_RESPONSE,
    },
  })
  async sjGetPeso(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let client = new net.Socket();
      client.on('error', (ex: object) => {
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
        client.on('data', async (data: Buffer) => {

          pesoBuffer = pesoBuffer.concat(data.toString());
          //let pesoBA = pesoBuffer.substring(4, 10);
          console.log(parseInt(pesoBuffer));

          if (
            pesoBuffer.toString().indexOf('ST,GS,') !== -1 &&
            pesoBuffer.toString().indexOf('kg') !== -1
          ) {
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

  @get('/bascula/baGetPeso', {
    parameters: [
      { name: 'ip', schema: { type: 'string' }, in: 'query' },
      { name: 'port', schema: { type: 'number' }, in: 'query' },
    ],
    responses: {
      '200': BASCULA_BA_RESPONSE,
    },
  })
  async baGetPeso(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let client = new net.Socket();
      client.on('error', (ex: object) => {
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
        client.on('data', async (data: Buffer) => {

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
                })
              };
            }
          }
        });
      });
    });
  }

  @get('/bascula/asGetPeso', {
    parameters: [
      { name: 'ip', schema: { type: 'string' }, in: 'query' },
      { name: 'port', schema: { type: 'number' }, in: 'query' },
    ],
    responses: {
      '200': BASCULA_AS_RESPONSE,
    },
  })
  async asGetPeso(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let client = new net.Socket();
      client.on('error', (ex: object) => {
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
        client.on('data', async (data: Buffer) => {

          pesoBuffer = pesoBuffer.concat(data.toString());

          {
            if (pesoBuffer.toString().length >= 7) {

              let peso = pesoBuffer.substring(1,);

              if (peso.length > 0) {
                client.destroy();
              }

              console.log('Peso OK --> ' + parseInt(peso, 10));

              if (peso.length >= 5) {

                resolve({
                  bascula: ip,
                  port: port,
                  peso: parseInt(peso, 10),


                })
              }
            };
          }
        });
      });
    });
  }
}



