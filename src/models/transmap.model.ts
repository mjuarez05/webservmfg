import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'transmap'}}
})
export class Transmap extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'transid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  transid?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'roleid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  roleid?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transmap>) {
    super(data);
  }
}

export interface TransmapRelations {
  // describe navigational properties here
}

export type TransmapWithRelations = Transmap & TransmapRelations;
