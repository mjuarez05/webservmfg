import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: 'filter',
    idInjection: false,
    postgresql: {schema: 'greentrz', table: 'as_hpospal'},
  },
})
export class AsHpospal extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
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
    postgresql: {
      columnName: 'numpal',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  numpal: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'usuario',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  usuario: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'fecha',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'id_camara',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idCamara: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'col',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  col: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'fila',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  fila: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'altura',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  altura: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'estado',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  estado: boolean;

  @property({
    type: 'number',
    required: true,
    scale: 0,
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
    // required: true,
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AsHpospal>) {
    super(data);
  }
}

export interface AsHpospalRelations {
  // describe navigational properties here
}

export type AsHpospalWithRelations = AsHpospal & AsHpospalRelations;
