import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'accesstoken'}}
})
export class Accesstoken extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'ttl', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  ttl?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'scopes', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  scopes?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'created', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  created?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'userid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  userid?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Accesstoken>) {
    super(data);
  }
}

export interface AccesstokenRelations {
  // describe navigational properties here
}

export type AccesstokenWithRelations = Accesstoken & AccesstokenRelations;
