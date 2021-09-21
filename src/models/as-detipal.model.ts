import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    strict: false,
    postgresql: {schema: 'greentrz', table: 'as_detipal'},
  },
})
export class AsDetipal extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
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
    required: true,
    precision: 9,
    scale: 0,
    id: 2,
    postgresql: {
      columnName: 'numpal',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 9,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  numpal: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 3,
    postgresql: {
      columnName: 'id_area',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idArea: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'pto_pes',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  ptoPes: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'fechor_pes',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  fechorPes: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'id_turno',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idTurno: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {
      columnName: 'id_prod',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  idProd: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    postgresql: {
      columnName: 'unidades',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  unidades: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {
      columnName: 'tara_pal',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 6,
      dataScale: 3,
      nullable: 'NO',
    },
  })
  taraPal: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {
      columnName: 'tara_bolsa',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 6,
      dataScale: 3,
      nullable: 'NO',
    },
  })
  taraBolsa: number;

  @property({
    type: 'number',
    required: true,
    precision: 7,
    scale: 3,
    postgresql: {
      columnName: 'kneto',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 7,
      dataScale: 3,
      nullable: 'NO',
    },
  })
  kneto: number;

  @property({
    type: 'number',
    required: true,
    precision: 7,
    scale: 3,
    postgresql: {
      columnName: 'kbruto',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 7,
      dataScale: 3,
      nullable: 'NO',
    },
  })
  kbruto: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'fec_prod',
      dataType: 'string',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  fecProd: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'fec_cong',
      dataType: 'string',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  fecCong: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'fec_venc',
      dataType: 'string',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  fecVenc: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'id_usuario',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idUsuario: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    postgresql: {
      columnName: 'lote',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  lote: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'hora_aper',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  horaAper: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'hora_cierre',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  horaCierre: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'id_estado',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idEstado: number;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'intervenido',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  intervenido?: boolean;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'retenido',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  retenido?: boolean;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'obsintervenido',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  obsintervenido?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'obsretenido',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  obsretenido?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'obspallet',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  obspallet?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AsDetipal>) {
    super(data);
  }
}

export interface AsDetipalRelations {
  // describe navigational properties here
}

export type AsDetipalWithRelations = AsDetipal & AsDetipalRelations;
