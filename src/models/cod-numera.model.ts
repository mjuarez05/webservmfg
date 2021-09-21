import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'cod_numera'},
  },
})
export class CodNumera extends Entity {
  @property({
    type: 'number',
    //required: true,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'number',
    //// required: true,
    scale: 0,
    id: 2,
    postgresql: {
      columnName: 'id_planta',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idPlanta: number;

  @property({
    type: 'number',
    //required: true,
    scale: 0,
    postgresql: {
      columnName: 'numdde',
      dataType: 'bigint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  numdde: number;

  @property({
    type: 'number',
    //required: true,
    scale: 0,
    postgresql: {
      columnName: 'numhta',
      dataType: 'bigint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  numhta: number;

  @property({
    type: 'number',
    //required: true,
    scale: 0,
    postgresql: {
      columnName: 'ultusado',
      dataType: 'bigint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  ultusado: number;

  @property({
    type: 'boolean',
    //required: true,
    postgresql: {
      columnName: 'renovauto',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  renovauto: boolean;

  @property({
    type: 'string',
    //required: true,
    length: 100,
    postgresql: {
      columnName: 'descr',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  descr: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CodNumera>) {
    super(data);
  }
}

export interface CodNumeraRelations {
  // describe navigational properties here
}

export type CodNumeraWithRelations = CodNumera & CodNumeraRelations;
