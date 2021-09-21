import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'transaccion'}}
})
export class Transaccion extends Entity {
  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'name', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'trx', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  trx: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  icon?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'component', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  component: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'menuid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  menuid?: number;

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

  constructor(data?: Partial<Transaccion>) {
    super(data);
  }
}

export interface TransaccionRelations {
  // describe navigational properties here
}

export type TransaccionWithRelations = Transaccion & TransaccionRelations;
