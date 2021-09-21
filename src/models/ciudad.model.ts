import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'ciudad'}}
})
export class Ciudad extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'ciudad_nombre', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  ciudadNombre?: string;

  @property({
    type: 'number',
    precision: 5,
    scale: 0,
    postgresql: {columnName: 'cp', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'YES'},
  })
  cp?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'provincia_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  provinciaId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
