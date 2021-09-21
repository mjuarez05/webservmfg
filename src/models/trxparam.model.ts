import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plantas} from './plantas.model';
import {Transaccion} from './transaccion.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'trxparam'},
  },
})
export class Trxparam extends Entity {
  // @property({
  //   type: 'number',
  //   required: true,
  //   scale: 0,
  //   postgresql: {columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  // })
  // idPlanta: number;

  // @property({
  //   type: 'number',
  //   required: true,
  //   scale: 0,
  //   postgresql: {columnName: 'id_trx', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  // })
  // idTrx: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'descr',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  descr: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'valor',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  valor: string;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @belongsTo(() => Plantas, {name: 'planta'})
  id_planta: number;

  @belongsTo(() => Transaccion, {name: 'trx'})
  id_trx: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trxparam>) {
    super(data);
  }
}

export interface TrxparamRelations {
  // describe navigational properties here
}

export type TrxparamWithRelations = Trxparam & TrxparamRelations;
