import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'paramCam'}}
})
export class ParamCam extends Entity {
  @property({
    type: 'number',
    //required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
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
    postgresql: {columnName: 'numcam', dataType: 'numeric', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  numcam: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'col', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  col: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'fila', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  fila: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'altura', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  altura: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'pasillo', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  pasillo: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'estado', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_grupmat', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idGrupmat?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ParamCam>) {
    super(data);
  }
}

export interface ParamCamRelations {
  // describe navigational properties here
}

export type ParamCamWithRelations = ParamCam & ParamCamRelations;
