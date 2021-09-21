import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'unimed'}}
})
export class Unimed extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'decr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  decr: string;

  @property({
    type: 'string',
    required: true,
    length: 3,
    postgresql: {columnName: 'descr_reduc', dataType: 'character varying', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descrReduc: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Unimed>) {
    super(data);
  }
}

export interface UnimedRelations {
  // describe navigational properties here
}

export type UnimedWithRelations = Unimed & UnimedRelations;
