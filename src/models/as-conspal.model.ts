import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false, postgresql: {schema: 'greentrz', table: 'as_conspal'}}
})
export class AsConspal extends Entity {
  @property({
    type: 'number',
    // required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idPlanta: number;

  @property({
    type: 'number',
    required: true,
    precision: 9,
    scale: 0,
    postgresql: {columnName: 'id_numpal', dataType: 'numeric', dataLength: null, dataPrecision: 9, dataScale: 0, nullable: 'NO'},
  })
  idNumpal: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_usuario', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idUsuario: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'id_producto', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  idProducto: string;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'knetos', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO'},
  })
  knetos: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'haper', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  haper: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'hcierr', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  hcierr: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'cantbolsas', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  cantbolsas?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_area', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idArea: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AsConspal>) {
    super(data);
  }
}

export interface AsConspalRelations {
  // describe navigational properties here
}

export type AsConspalWithRelations = AsConspal & AsConspalRelations;
